import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import router from '#app/api/router.js';

import config from '#core/config/index.js';
import logger from '#core/lib/winston/logger.js';

import validateJsonPayloadMiddleware from '#core/middlewares/validateJsonPayload.middleware.js';
import errorHandlerMiddleware from '#core/middlewares/errorHandler.middleware.js';

export default {
  start: () => {
    const app = express();

    app
      .use(
        cors({
          origin: ['http://localhost:3001', 'http://localhost:4200'],
          credentials: true,
        })
      )
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
          message: `Application running on: ${config.APP.HOST}:${config.APP.PORT}`,
        });

        resolve();
      });
    });
  },
};
