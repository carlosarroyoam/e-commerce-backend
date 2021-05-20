class BookRepository {
  constructor({ dbConnection, logger }) {
    this._dbConnection = dbConnection;
    this._logger = logger;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, title FROM books';

      this._dbConnection.pool.query(query, (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookRepository;
