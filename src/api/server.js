const express = require('express');
const { json } = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

class Server {
  constructor({ config, router }) {
    this._config = config;
    this._express = express();
    this._express
      .use(cors())
      .use(json())
      .use(compression())
      .use(morgan('dev'))
      .use(router)
      .use((err, req, res, next) => {
        if (err.status === 404) {
          res.status(404).send({
            message: err.message,
            error: err.name,
          });

          return;
        }

        res.status(500).send({
          message: err.message,
          error: 'Internal server error',
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
      const http = this._express.listen(this._config.PORT, () => {
        const { port } = http.address();
        console.info(`Application running on port: ${port}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
