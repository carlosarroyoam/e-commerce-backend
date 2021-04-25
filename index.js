const container = require('./src/api/container');

const application = container.resolve('app');

application.start().catch((error) => {
  console.error(error);
  process.exit();
});