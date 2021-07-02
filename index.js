const container = require('./src/api/container');

const server = container.resolve('server');
const logger = container.resolve('logger');

server.catch((err) => {
    logger.log({
        level: 'error',
        message: err.message,
    });

    process.exit();
});
