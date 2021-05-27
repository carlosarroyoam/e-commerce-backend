class BookRepository {
  constructor({ dbConnection, logger }) {
    this._dbConnection = dbConnection.pool;
    this._logger = logger.instance;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, title FROM book';

      this._dbConnection.query(query, (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
            meta: err,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookRepository;
