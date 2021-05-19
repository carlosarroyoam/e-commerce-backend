class UserDao {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE deleted_at IS NULL', (err, result) => {
        if (err) {
          console.error(err);

          reject(err);
        }

        resolve(result);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL', [id], (err, result) => {
        if (err) {
          console.error(err);

          reject(err);
        }

        resolve(result);
      });
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT id FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          console.error(err);

          reject(err);
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
          console.error(err);

          reject(err);
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

          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserDao;
