let currentConfig = {
  includeTimestamp: true,
  includePath: true,
  customDictionary: [],
  defaultFormatter: null, // A function(err, req) that returns the final JSON response
  
  // Internationalization
  language: 'en', // 'en', 'hi', 'es', 'fr', etc.
  
  // Security: Data Masking
  maskSensitiveData: true,
  maskFields: ['password', 'creditCard', 'credit_card', 'token', 'authorization', 'secret', 'apikey', 'api_key', 'cc'],
  
  // Webhooks / Integrations (Sentry, Datadog, Slack, etc.)
  webhookUrl: null, // URL to POST error payloads
  webhookHeaders: { 'Content-Type': 'application/json' },
  onWebhookError: (err) => console.error('Error sending webhook:', err.message)
};

/**
 * Configure the universal error handler globally.
 * 
 * @param {Object} options 
 * @param {boolean} [options.includeTimestamp] - Whether to include ISO timestamp in error response
 * @param {boolean} [options.includePath] - Whether to include req.path in error response
 * @param {Array} [options.customDictionary] - List of custom error mappings
 * @param {Function} [options.defaultFormatter] - Custom response formatter fn(err, req)
 * @param {string} [options.language] - Language code for error messages (e.g. 'en', 'hi', 'es')
 * @param {boolean} [options.maskSensitiveData] - Automatically mask sensitive fields in details
 * @param {Array<string>} [options.maskFields] - Array of object keys to mask
 * @param {string} [options.webhookUrl] - URL to send error reports
 * @param {Object} [options.webhookHeaders] - Headers for webhook request
 */
const configureErrorHandler = (options = {}) => {
  currentConfig = {
    ...currentConfig,
    ...options
  };
};

const getConfig = () => currentConfig;

module.exports = {
  configureErrorHandler,
  getConfig
};
