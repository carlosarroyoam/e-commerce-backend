import server from '#app/api/server.js';
import logger from '#common/lib/winston/logger.js';

server.start().catch((err) => {
  logger.log({
    level: 'error',
    message: err.message,
  });

  process.exit();
});
