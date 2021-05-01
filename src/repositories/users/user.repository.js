class UserRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email FROM users', (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        resolve(result);
      });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserRepository;
