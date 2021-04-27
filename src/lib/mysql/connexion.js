const mysql = require('mysql');

class DatabaseConnection {
  constructor({ config }) {
    this._config = config;

    this._pool = mysql.createPool({
      connectionLimit: this._config.connectionLimit,
      host: this._config.DB.host,
      user: this._config.DB.user,
      password: this._config.DB.password,
      database: this._config.DB.database,
    });
  }

  getPool() {
    return this._pool;
  }
}

module.exports = DatabaseConnection;
