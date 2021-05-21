class StartUp {
  constructor({ server }) {
    this._server = server;
  }

  /**
   * Invokes server.start()
   */
  async start() {
    await this._server.start();
  }
}

module.exports = StartUp;
