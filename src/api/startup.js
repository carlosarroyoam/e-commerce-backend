class StartUp {
  constructor({ server, logger }) {
    this._server = server;
    this._logger = logger;
  }

  /**
   * Invokes server.start()
   */
  async start() {
    await this._server.start();
  }
}

module.exports = StartUp;
