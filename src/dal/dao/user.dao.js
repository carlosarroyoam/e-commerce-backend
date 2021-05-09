class UserDao {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email FROM users', (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving user'));
        }

        resolve(result);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving user'));
        }

        resolve(result);
      });
    });
  }

  create(user) {
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

  update(userId, user) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

      this._dbConnection.getConnection().query(query, [user, userId], (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Error while updating user'));
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserDao;
