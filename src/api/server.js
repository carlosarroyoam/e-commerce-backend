const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

module.exports = ({ config, router, logger }) => {
  const app = express();

  app.use(cors())
    .use(express.json())
    .use(compression())
    .use(morgan('dev'))
    .use(helmet())
    .use(router)
    .use((err, req, res, next) => {
      logger.log({
        level: err.status ? 'info' : 'error',
        message: err.message,
      });

      res.status(err.status || 500).send({
        message: err.message,
        error: err.name !== 'Error' ? err.name : 'Internal server error',
        data: err.errors,
      });

      next();
    });

  return new Promise((resolve) => {
    app.listen(config.PORT, () => {
      // eslint-disable-next-line no-console
      console.info(`Application running on: http://localhost:${config.PORT}`);
      resolve();
    });
  });
};
