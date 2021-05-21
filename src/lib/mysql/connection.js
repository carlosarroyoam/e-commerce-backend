const mysql = require('mysql2');

class DatabaseConnection {
  constructor({ config }) {
    this._config = config;

    this.pool = mysql.createPool({
      connectionLimit: this._config.DB.connectionLimit,
      host: this._config.DB.host,
      user: this._config.DB.user,
      password: this._config.DB.password,
      database: this._config.DB.database,
    });
  }
}

module.exports = DatabaseConnection;
