const mysql = require('mysql2/promise');

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

    this.pool.on('connection', (connection) => {
      console.log('connected', connection.threadId);
    });

    this.pool.on('release', (connection) => {
      console.log('Connection %d released', connection.threadId);
    });

    this.pool.on('acquire', (connection) => {
      console.log('Connection %d acquired', connection.threadId);
    });
  }
}

module.exports = DatabaseConnection;
