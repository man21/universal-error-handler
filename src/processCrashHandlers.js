const { getLogger } = require('./logger');

/**
 * Configure process-level crash handlers to ensure the application logs the fatal error before exiting.
 * Handles fatal exceptions that bypass the usual HTTP request middleware flow.
 * 
 * @param {Object} [server=null] - An optional HTTP server instance to `.close()` gracefully before crashing.
 */
const setupProcessCrashHandlers = (server = null) => {
  const logger = getLogger();

  process.on('uncaughtException', (err) => {
    logger.error('💥 UNCAUGHT EXCEPTION! Shutting down gracefully...', err.name, err.message, err.stack);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });

  process.on('unhandledRejection', (err) => {
    logger.error('💥 UNHANDLED REJECTION! Shutting down gracefully...', err.name, err.message, err.stack);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });
};

module.exports = { setupProcessCrashHandlers };
