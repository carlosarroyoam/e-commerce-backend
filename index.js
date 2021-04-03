const container = require('./api/container');

const application = container.resolve('app');

application.start().catch((error) => {
    console.error(error);
    process.exit();
});