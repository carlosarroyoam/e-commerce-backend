const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const config = require('../config');
const router = require('./router');
const logger = require('../shared/lib/winston/logger');
const validateJsonPayloadMiddleware = require('../shared/middlewares/validateJsonPayload.middleware');
const errorHandlerMiddleware = require('../shared/middlewares/errorHandler.middleware');

module.exports = {
  start: () => {
    const app = express();

    app
      .use(cors({ origin: 'http://localhost:3001', credentials: true }))
      .use(express.json())
      .use(cookieParser())
      .use(compression())
      .use(morgan('dev'))
      .use(helmet())
      .use(router())
      .use(validateJsonPayloadMiddleware())
      .use(errorHandlerMiddleware());

    return new Promise((resolve) => {
      app.listen(config.APP.PORT, () => {
        logger.log({
          level: 'info',
          message: `Application running on: ${config.APP.URL}:${config.APP.PORT}`,
        });

        resolve();
      });
    });
  },
};
