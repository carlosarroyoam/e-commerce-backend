import logger from '#common/lib/winston/logger.js';

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
