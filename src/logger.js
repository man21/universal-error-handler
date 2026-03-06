let _logger = console;

/**
 * Configure the global logger for the error handler.
 * @param {Object} customLogger - A logger object with error, warn, info, debug methods (like Winston or Pino)
 */
const setLogger = (customLogger) => {
  if (customLogger && typeof customLogger.error === 'function') {
    _logger = customLogger;
  }
};

const getLogger = () => _logger;

module.exports = {
  setLogger,
  getLogger
};
