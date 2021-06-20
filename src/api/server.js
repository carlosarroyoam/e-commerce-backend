const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

class Server {
  constructor({
    config, router, logger,
  }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express
      .use(cors())
      .use(express.json())
      .use(compression())
      .use(morgan('dev'))
      .use(router)
      .use((err, req, res, next) => {
        this.logger.log({
          level: err.status ? 'info' : 'error',
          message: err.message,
        });

        res.status(err.status || 500).send({
          message: err.message,
          error: err.name !== 'Error' ? err.name : 'Internal server error',
          data: err.errors,
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
      this.express.listen(this.config.PORT, () => {
        console.info(`Application running on: http://localhost:${this.config.PORT}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
