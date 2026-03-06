const https = require('https');
const http = require('http');
const { getConfig } = require('./config');
const { parse } = require('url');

/**
 * Dispatch an error payload to a configured webhook asynchronously.
 * Doesn't block the request. Captures tracking dynamically.
 * 
 * @param {Object} payload - The error payload to send
 */
const dispatchWebhook = (payload) => {
  const config = getConfig();
  
  if (!config.webhookUrl) return;

  const urlOptions = parse(config.webhookUrl);
  const isHttps = urlOptions.protocol === 'https:';
  const client = isHttps ? https : http;

  const options = {
    hostname: urlOptions.hostname,
    port: urlOptions.port || (isHttps ? 443 : 80),
    path: urlOptions.path,
    method: 'POST',
    headers: {
      ...config.webhookHeaders,
      'Content-Type': 'application/json'
    }
  };

  const stringifiedData = JSON.stringify(payload);

  const req = client.request(options, (res) => {
    // Optionally log successful transmission in verbose mode
    if (res.statusCode < 200 || res.statusCode >= 300) {
      config.onWebhookError(new Error(`Webhook failed with status ${res.statusCode}`));
    }
  });

  req.on('error', (err) => {
    config.onWebhookError(err);
  });

  req.write(stringifiedData);
  req.end();
};

module.exports = { dispatchWebhook };
