class UserDao {
  constructor({ dbConnection, logger }) {
    this._dbConnection = dbConnection;
    this._logger = logger;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, first_name, last_name, email, created_at, updated_at
      FROM users
      WHERE deleted_at IS NULL`;

      this._dbConnection.pool.query(query, (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
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

      this._dbConnection.pool.query(query, [id], (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
        }

        resolve(result);
      });
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM users WHERE email = ?';

      this._dbConnection.pool.query(query, [email], (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
        }

        resolve(result);
      });
    });
  }

  create(user) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';

      this._dbConnection.pool.query(query, user, (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
        }

        resolve(result);
      });
    });
  }

  update(userId, user) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

      this._dbConnection.pool.query(query, [user, userId], (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
        }

        resolve(result);
      });
    });
  }

  delete(userId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET deleted_at = NULL WHERE id = ? LIMIT 1';

      this._dbConnection.pool.query(query, [userId], (err, result) => {
        if (err) {
          this._logger.instance.log({
            level: 'error',
            message: err.message,
          });

          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserDao;
