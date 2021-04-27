class BookController {
  constructor({ config, dbConnection }) {
    this._config = config;
    this._dbConnection = dbConnection;
  }

  index(req, res) {
    this._dbConnection.getPool().query('SELECT id, name FROM users', (err, result) => {
      if (err) throw err;
      res.send({
        status: 200,
        message: 'OK',
        data: result,
      });
    });
  }
}

module.exports = BookController;
