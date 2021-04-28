class BookController {
  constructor({ config, dbConnection }) {
    this._config = config;
    this._dbConnection = dbConnection;
  }

  index() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT * FROM users', (err, result) => {
        if (err) {
          throw err;
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookController;
