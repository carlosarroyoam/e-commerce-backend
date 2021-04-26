class BookController {
  constructor({ dbConnection }) {
    // this._userService = userService;
    this._dbConnection = dbConnection;
  }

  index(req, res) {
    this._dbConnection.pool.query('SELECT * FROM books', (err, result) => {
      if (err) {
        throw new Error(err);
      }

      return res.json({
        status: 200,
        message: 'OK',
        data: {
          result,
          message: 'hello world',
        },
      });
    });
  }
}

module.exports = BookController;
