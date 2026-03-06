class AppError extends Error {
  /**
   * Universal Error Handler Base Error Class
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {string|null} errorCode - A specific error code (e.g. 'VALIDATION_FAILED')
   * @param {boolean} isOperational - Indicates if the error is operational (trusted) or unexpected
   * @param {Object} details - Additional error details or context
   */
  constructor(message, statusCode = 500, errorCode = null, isOperational = true, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Capture the stack trace, excluding the constructor call from it
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad Request', errorCode = 'BAD_REQUEST', details = {}) {
    super(message, 400, errorCode, true, details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', errorCode = 'UNAUTHORIZED', details = {}) {
    super(message, 401, errorCode, true, details);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', errorCode = 'FORBIDDEN', details = {}) {
    super(message, 403, errorCode, true, details);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found', errorCode = 'NOT_FOUND', details = {}) {
    super(message, 404, errorCode, true, details);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict', errorCode = 'CONFLICT', details = {}) {
    super(message, 409, errorCode, true, details);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable Entity', errorCode = 'UNPROCESSABLE_ENTITY', details = {}) {
    super(message, 422, errorCode, true, details);
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', errorCode = 'INTERNAL_SERVER_ERROR', details = {}) {
    super(message, 500, errorCode, false, details);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError
};
