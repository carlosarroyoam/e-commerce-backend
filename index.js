const container = require('./src/api/container');

const application = container.resolve('app');
const logger = container.resolve('logger');

application.start().catch((err) => {
  logger.instance.log({
    level: 'error',
    message: err.message,
  });

  process.exit();
});
