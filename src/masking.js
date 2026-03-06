const { getConfig } = require('./config');

/**
 * Recursively masks sensitive fields in an object or array.
 * 
 * @param {any} data - The data to mask (object, array, primitive).
 * @param {Array<string>} [maskFields] - Key names to mask.
 * @returns {any} - A cloned and masked copy of the data.
 */
const maskData = (data, maskFields = []) => {
  const config = getConfig();
  if (!config.maskSensitiveData) return data;

  const fieldsToMask = maskFields.length > 0 ? maskFields : config.maskFields;

  // Handle primitives and nulls
  if (data === null || typeof data !== 'object') {
    return data;
  }

  // Handle Arrays
  if (Array.isArray(data)) {
    return data.map(item => maskData(item, fieldsToMask));
  }

  // Handle Objects
  const maskedObj = {};
  for (const [key, value] of Object.entries(data)) {
    const isSensitive = fieldsToMask.some(field => key.toLowerCase().includes(field.toLowerCase()));

    if (isSensitive) {
      // Mask the string or replace the value entirely
      maskedObj[key] = typeof value === 'string' ? '*'.repeat(Math.min(8, value.length || 8)) : '********';
    } else {
      maskedObj[key] = maskData(value, fieldsToMask);
    }
  }

  return maskedObj;
};

module.exports = { maskData };
