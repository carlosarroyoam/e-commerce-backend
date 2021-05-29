const express = require('express');
const { json } = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

class Server {
  constructor({ config, router, logger }) {
    this._config = config;
    this._logger = logger.instance;
    this._express = express();
    this._express
      .use(cors())
      .use(json())
      .use(compression())
      .use(morgan('dev'))
      .use(router)
      .use((err, req, res, next) => {
        if (err.status === 400) {
          this._logger.log({
            level: 'info',
            message: err.message,
          });

          res.status(400).send({
            message: 'Bad request',
            error: err.message,
          });

          return;
        }

        if (err.status === 404) {
          this._logger.log({
            level: 'info',
            message: err.message,
          });

          res.status(404).send({
            message: 'Not found',
            error: err.message,
          });

          return;
        }

        this._logger.log({
          level: 'error',
          message: err.message,
          meta: err,
        });

        res.status(500).send({
          message: 'Internal server error',
          error: err.message,
        });
      });
  }

  /**
   * Starts the express server and listens for  incoming connections
   *
   * @returns {Promise}
   */
  start() {
    return new Promise((resolve) => {
      this._express.listen(this._config.PORT, () => {
        console.info(`Application running on: http://localhost:${this._config.PORT}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
