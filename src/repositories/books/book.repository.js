class BookRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving books'));
        }

        resolve(result);
      });
    });
  }
}

module.exports = BookRepository;
