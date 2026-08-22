import logger from '#core/lib/winston/logger.js';

/**
 * Creates the error-handling middleware that logs and formats thrown errors as JSON responses.
 *
 * @return {Function} The error-handling middleware.
 */
export default () => async (error, request, response, next) => {
  logger.log({
    level: error.status !== 500 ? 'info' : 'error',
    message: error.message,
  });

  if (!error.fatal) {
    return response.status(error.status || 500).json({
      message: error.message,
      error: error.name,
      details: error.errors,
      status: error.status,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }

  next();
};
