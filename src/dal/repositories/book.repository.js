class BookRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, title FROM books', (err, result) => {
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
