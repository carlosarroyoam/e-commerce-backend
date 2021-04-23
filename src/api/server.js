const express = require('express');

class Server {
  constructor({ config, router }) {
    this._config = config;
    this._express = express();
    this._express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this._express.listen(this._config.PORT, () => {
        console.info(`Application running on port: ${http.address()}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
