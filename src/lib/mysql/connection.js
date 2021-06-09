const mysql = require('mysql2/promise');

class DatabaseConnection {
  constructor({ config }) {
    this.pool = mysql.createPool({
      connectionLimit: config.DB.CONNECTION_LIMIT,
      host: config.DB.DB_HOST,
      user: config.DB.USER,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE_NAME,
    });
  }
}

module.exports = DatabaseConnection;
