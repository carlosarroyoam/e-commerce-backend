const logger = require('../lib/winston/logger');

module.exports = () => async (error, request, response, next) => {
  logger.log({
    level: error.status !== 500 ? 'info' : 'error',
    message: error.message,
  });

  if (!error.fatal) {
    return response.status(error.status || 500).json({
      error: error.name,
      message: error.message,
      data: error.errors,
    });
  }

  next();
};
