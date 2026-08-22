import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import router from '#app/api/router.js';
import config from '#core/config/index.js';
import logger from '#core/lib/winston/logger.js';
import errorHandlerMiddleware from '#core/middlewares/errorHandler.middleware.js';
import validateJsonPayloadMiddleware from '#core/middlewares/validateJsonPayload.middleware.js';

export default {
  /**
   * @returns {Promise<void>}
   */
  start: () => {
    const app = express();

    app
      .use(
        cors({
          origin: config.APP.CORS_ORIGIN,
          credentials: true,
        })
      )
      .use(helmet())
      .use(compression())
      .use(express.json())
      .use(cookieParser())
      .use(morgan(config.APP.ENV === 'prod' ? 'combined' : 'dev'))
      .use(router())
      .use(validateJsonPayloadMiddleware())
      .use(errorHandlerMiddleware());

    return new Promise((resolve, reject) => {
      const server = app.listen(config.APP.PORT, () => {
        logger.log({
          level: 'info',
          message: `Application running on: ${config.APP.HOST}:${config.APP.PORT}`,
        });

        resolve();
      });

      server.on('error', (error) => {
        logger.log({
          level: 'error',
          message: error.message,
        });

        reject(error);
      });
    });
  },
};
