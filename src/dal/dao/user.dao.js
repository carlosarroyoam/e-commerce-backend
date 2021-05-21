class UserDao {
  constructor({ dbConnection, logger }) {
    this._dbConnection = dbConnection.pool;
    this._logger = logger.instance;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, first_name, last_name, email, created_at, updated_at
      FROM users
      WHERE deleted_at IS NULL`;

      this._dbConnection.query(query, (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, first_name, last_name, email, created_at, updated_at
      FROM users
      WHERE id = ? AND deleted_at IS NULL`;

      this._dbConnection.query(query, [id], (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM users WHERE email = ?';

      this._dbConnection.query(query, [email], (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  create(user) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';

      this._dbConnection.query(query, user, (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  update(userId, user) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

      this._dbConnection.query(query, [user, userId], (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  delete(userId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET deleted_at = NULL WHERE id = ? LIMIT 1';

      this._dbConnection.query(query, [userId], (err, result) => {
        if (err) {
          this._logger.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserDao;
