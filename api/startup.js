class StartUp {
  constructor({ server }) {
    this._server = server;
  }

  async start() {
    try {
      await this._server.start();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = StartUp;
