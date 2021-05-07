class UserRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email FROM users', (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving users'));
        }

        resolve(result);
      });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving user'));
        }

        resolve(result);
      });
    });
  }

  store(user) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';

      this._dbConnection.getConnection().query(query, user, (err, result) => {
        if (err) {
          reject(new Error('Error while storing user'));
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserRepository;
