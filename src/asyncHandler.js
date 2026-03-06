/**
 * Express Async Handler Middleware
 * Wraps asynchronous Express callbacks to avoid repetitive `try...catch` blocks.
 * Errors thrown in the block will automatically be passed to the next() middleware.
 * 
 * @param {Function} fn - The asynchronous valid Express route handler.
 * @returns {Function} - The wrapped function that handles errors.
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { asyncHandler };
