const { CustomMessages } = require("./customMessage");
const codes = require("./statusCodes");

const { 
  AppError, 
  BadRequestError, 
  UnauthorizedError, 
  ForbiddenError, 
  NotFoundError, 
  ConflictError, 
  UnprocessableEntityError, 
  InternalServerError 
} = require("./BaseError");

const { expressErrorMiddleware, fastifyErrorMiddleware, parseError } = require("./middlewares");
const { asyncHandler } = require("./asyncHandler");
const { normalizeError } = require("./errorParser");
const { setLogger, getLogger } = require("./logger");
const { setupProcessCrashHandlers } = require("./processCrashHandlers");
const { configureErrorHandler, getConfig } = require("./config");

// Legacy support: StatusCodeError and getResponse
class StatusCodeError extends Error {
  constructor(statusCode) {
    super(`Status code ${statusCode} is invalid.`);
    this.name = "StatusCodeError";
    this.statusCode = statusCode;
  }
}

/**
 * Get a structured response based on HTTP status code.
 * @param {number} statusCode - The HTTP status code.
 * @returns {Object} Response object containing the statusCode and message.
 * @throws {StatusCodeError} If the provided status code is invalid or not found.
 */
const getResponse = (statusCode) => {
  if (typeof statusCode !== 'number') {
    throw new StatusCodeError(statusCode);
  }
  const statusData = codes.find(code => code.code === statusCode);
  if (!statusData) {
    throw new StatusCodeError(statusCode);
  }
  return {
    statusCode: statusData.code,
    message: statusData.phrase,
  };
};

module.exports = {
  // Legacy Export
  HttpErrorDetail: getResponse,
  
  // Custom Error Array
  CustomMessages,
  
  // Core Domain Error Classes
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
  StatusCodeError,

  // Middleware Utilities
  expressErrorMiddleware,
  fastifyErrorMiddleware,
  asyncHandler,

  // Configuration
  configure: configureErrorHandler,
  getConfig,

  // Normalizer & Parsing
  normalizeError,
  parseError,

  // Event Handlers & Logger
  setLogger,
  getLogger,
  setupProcessCrashHandlers
};
