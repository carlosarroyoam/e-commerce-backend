class BookRepository {
  constructor({ dbConnection, exceptions }) {
    this._dbConnection = dbConnection;
    this._exceptions = exceptions;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving books'));
        }

        if (result.length < 1) {
          reject(new this._exceptions.ResourceNotFoundError('No books registered', 'book'));
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookRepository;
