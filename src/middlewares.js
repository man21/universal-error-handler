const { getLogger } = require('./logger');
const { normalizeError } = require('./errorParser');
const { CustomMessages } = require('./customMessage');
const { getConfig } = require('./config');
const { maskData } = require('./masking');
const { translateError } = require('./i18n');
const { dispatchWebhook } = require('./webhook');

/**
 * Parses and normalizes an error from CustomMessage or known external ORM errors.
 * 
 * @param {Error|number|string|Object} err - The error instance, HTTP status code, or custom error code
 * @param {string} [customMessageOverride=null] - Optional overridden message if throwing via string code
 * @param {Object} [customDetails={}] - Optional extra payload data
 * @returns {AppError} - The normalized AppError
 */
const parseError = (err, customMessageOverride = null, customDetails = {}) => {
  const { customDictionary, language } = getConfig();

  if (typeof err === 'number') {
    const customMatch = [...customDictionary, ...CustomMessages].find(c => c.statusCode === err);
    if (customMatch) {
      const error = new Error(customMessageOverride || translateError(customMatch.code || customMatch.error, customMatch.message, language));
      error.statusCode = customMatch.statusCode;
      error.errorCode = customMatch.code || customMatch.error || 'HTTP_ERROR';
      error.details = customDetails;
      return normalizeError(error);
    }
  }

  if (typeof err === 'string') {
    const customMatch = [...customDictionary, ...CustomMessages].find(c => c.code === err || c.error === err);
    if (customMatch) {
      const error = new Error(customMessageOverride || translateError(err, customMatch.message, language));
      error.statusCode = customMatch.statusCode;
      error.errorCode = err;
      error.details = customDetails;
      return normalizeError(error);
    }
    const fallbackError = new Error(translateError(err, err, language));
    fallbackError.details = customDetails;
    return normalizeError(fallbackError);
  }

  if (err && typeof err === 'object' && !(err instanceof Error)) {
     const newErr = new Error(err.message || 'Unknown Object Error');
     Object.assign(newErr, err);
     if (customMessageOverride) newErr.message = customMessageOverride;
     if (Object.keys(customDetails).length > 0) newErr.details = { ...err.details, ...customDetails };
     return normalizeError(newErr);
  }

  if (customDetails && Object.keys(customDetails).length > 0) {
    err.details = { ...err.details, ...customDetails };
  }
  
  if (customMessageOverride) {
    err.message = customMessageOverride;
  }

  return normalizeError(err);
};

const formatResponse = (normalizedError, req) => {
  const config = getConfig();

  if (config.defaultFormatter && typeof config.defaultFormatter === 'function') {
    return config.defaultFormatter(normalizedError, req);
  }

  const statusCode = normalizedError.statusCode || 500;
  const status = normalizedError.status || 'error';
  const errorCode = normalizedError.errorCode || 'INTERNAL_SERVER_ERROR';
  
  // Translate the normalized error message if applicable directly on top domain
  const rawMessage = normalizedError.message || 'Something went wrong on the server.';
  const message = translateError(errorCode, rawMessage, config.language);

  const responseData = { status, message, errorCode };

  // Apply Sensitive Data Masking on Details
  if (normalizedError.details !== undefined && Object.keys(normalizedError.details).length > 0) {
    responseData.details = maskData(normalizedError.details);
  }
  
  // Attach Timestamp if enabled
  if (config.includeTimestamp) {
    responseData.timestamp = new Date().toISOString();
  }

  // Attach Request Path if enabled
  if (config.includePath && req && (req.originalUrl || req.url)) {
    responseData.path = req.originalUrl || req.url;
  }

  // Attach Stack Trace in non-production environments
  if (process.env.NODE_ENV !== 'production' && normalizedError.stack) {
    responseData.stack = normalizedError.stack;
  }

  return responseData;
};

/**
 * Handle processing: logging and webhook dispatches.
 */
const postProcessError = (normalizedError, req, res) => {
  const logger = getLogger();
  const config = getConfig();
  const statusCode = normalizedError.statusCode || 500;

  // Mask payload data for logging
  const maskedError = { ...normalizedError, details: maskData(normalizedError.details) };

  if (!normalizedError.isOperational) {
    logger.error('💥 UNEXPECTED ERROR 💥', maskedError);
  } else if (statusCode >= 500) {
    logger.error('Operational Server Error:', maskedError);
  }

  // Fire Webhook for Server / Unhandled Errors
  if (config.webhookUrl && statusCode >= 500) {
    dispatchWebhook({
       level: normalizedError.isOperational ? 'error' : 'fatal',
       error: maskedError,
       statusCode,
       path: req ? req.originalUrl || req.url : 'Unknown',
       timestamp: new Date().toISOString()
    });
  }
};

/**
 * Express Error Handling Middleware.
 * `app.use(expressErrorMiddleware)`
 */
const expressErrorMiddleware = (err, req, res, next) => {
  const normalizedError = parseError(err);
  postProcessError(normalizedError, req, res);

  const statusCode = normalizedError.statusCode || 500;
  const responseData = formatResponse(normalizedError, req);
  res.status(statusCode).json(responseData);
};

/**
 * Fastify Error Middleware
 * fastify.setErrorHandler(fastifyErrorMiddleware)
 */
const fastifyErrorMiddleware = (error, request, reply) => {
  const normalizedError = parseError(error);
  postProcessError(normalizedError, request, reply);

  const statusCode = normalizedError.statusCode || 500;
  const responseData = formatResponse(normalizedError, request);
  reply.status(statusCode).send(responseData);
};

module.exports = {
  expressErrorMiddleware,
  fastifyErrorMiddleware,
  parseError
};
