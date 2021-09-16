const server = require('./src/api/server');
const logger = require('./src/shared/lib/winston/logger');

server().catch((err) => {
  logger.log({
    level: 'error',
    message: err.message,
  });

  process.exit();
});
