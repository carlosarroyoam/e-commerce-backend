const express = require('express');
const json = require('express');
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
      .use(router);
  }

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
