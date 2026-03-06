const { 
  AppError, 
  BadRequestError, 
  NotFoundError, 
  ConflictError, 
  UnprocessableEntityError,
  InternalServerError
} = require('./BaseError');

/**
 * Normalizes different kinds of common errors into AppError instances.
 * Handles Database errors (Mongoose, Sequelize, Prisma), validation errors (Zod, Yup, Joi, express-validator),
 * network errors (Axios), and generic programming errors natively.
 * 
 * @param {Error} err - The error to normalize
 * @returns {AppError} - The normalized AppError
 */
const normalizeError = (err) => {
  // If it's already an AppError, return it directly
  if (err instanceof AppError) {
    return err;
  }

  // Axios Network Error
  if (err.isAxiosError) {
    if (err.response) {
      return new AppError(
        `External API Error: ${err.message}`, 
        err.response.status || 502, 
        'EXTERNAL_API_ERROR', 
        true, 
        err.response.data
      );
    } else if (err.request) {
      return new AppError('No response received from external API', 502, 'API_NO_RESPONSE', true);
    }
    return new AppError(`Axios Setup Error: ${err.message}`, 500, 'AXIOS_SETUP_ERROR', false);
  }

  // Native Programming Errors (Reference, Type, Syntax) -> Hide internal logic and mark NOT operational in Prod
  if (err instanceof TypeError || err instanceof ReferenceError || err instanceof SyntaxError) {
    const error = new InternalServerError(err.message || 'Programming error encountered');
    error.isOperational = false;
    error.errorCode = 'RUNTIME_PROGRAMMING_ERROR';
    if (err.stack) error.stack = err.stack;
    return error;
  }

  // Zod Validation Errors
  if (err.name === 'ZodError' && Array.isArray(err.issues)) {
    const details = err.issues.map(e => ({ path: e.path.join('.'), message: e.message }));
    return new BadRequestError('Validation failed', 'ZOD_VALIDATION_ERROR', details);
  }

  // Express-Validator Errors (Usually has method `array`)
  if (err.array && typeof err.array === 'function' && Array.isArray(err.errors)) {
    return new BadRequestError('Validation failed', 'EXPRESS_VALIDATOR_ERROR', err.array());
  }

  // Generic Joi / Yup Validation errors (usually have details or inner array)
  if (err.isJoi || err.name === 'ValidationError') {
    // Check if it's mongoose validation error first (details usually don't exist as arrays)
    if (err.errors && typeof err.errors === 'object' && !Array.isArray(err.errors) && err.errors[Object.keys(err.errors)[0]]?.name === 'ValidatorError') {
      const dbErrors = Object.values(err.errors).map(el => el.message);
      return new BadRequestError(`Invalid input data. ${dbErrors.join('. ')}`, 'MONGO_VALIDATION_ERROR', dbErrors);
    }
    return new BadRequestError(err.message, 'VALIDATION_ERROR', err.details || err.errors || err.inner);
  }

  // Mongoose / MongoDB Specific
  if (err.name === 'CastError' && err.path) {
    return new BadRequestError(`Invalid ${err.path}: ${err.value}.`, 'INVALID_MONGO_ID');
  }
  if (err.code === 11000) {
    const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'Unknown Duplicate';
    return new ConflictError(`Duplicate field value: ${value}. Please use another value!`, 'MONGO_DUPLICATE_KEY');
  }

  // Prisma Errors
  if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    switch (err.code) {
      case 'P2002':
        return new ConflictError('Unique constraint failed on the database.', 'PRISMA_UNIQUE_CONSTRAINT');
      case 'P2025':
        return new NotFoundError('Record to update or delete was not found.', 'PRISMA_NOT_FOUND');
      case 'P2003':
        return new UnprocessableEntityError('Foreign key constraint failed.', 'PRISMA_FOREIGN_KEY_CONSTRAINT');
      default:
        return new BadRequestError(`Prisma Database Error: ${err.message}`, 'PRISMA_ERROR');
    }
  }

  // Sequelize Errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return new ConflictError('Database unique constraint error.', 'SEQUELIZE_UNIQUE_CONSTRAINT', err.errors);
  }
  if (err.name === 'SequelizeValidationError') {
    return new BadRequestError('Database validation error.', 'SEQUELIZE_VALIDATION_ERROR', err.errors);
  }

  // JSON Web Token Specific Errors
  if (err.name === 'JsonWebTokenError') {
    return new AppError('Invalid authentication token. Please log in again!', 401, 'INVALID_TOKEN');
  }
  if (err.name === 'TokenExpiredError') {
    return new AppError('Your token has expired! Please log in again.', 401, 'TOKEN_EXPIRED');
  }

  // Final fallback to internal server error if we don't know this error
  const defaultError = new InternalServerError(err.message || 'Something went very wrong on the server!');
  if (err.stack) defaultError.stack = err.stack;
  if (err.statusCode) defaultError.statusCode = err.statusCode;
  return defaultError;
};

module.exports = { normalizeError };
