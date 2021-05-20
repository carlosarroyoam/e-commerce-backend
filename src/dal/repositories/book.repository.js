class BookRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, title FROM books';

      this._dbConnection.pool.query(query, (err, result) => {
        if (err) {
          console.error(err);

          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookRepository;
