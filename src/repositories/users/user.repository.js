class UserRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, name FROM users', (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, name FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserRepository;
