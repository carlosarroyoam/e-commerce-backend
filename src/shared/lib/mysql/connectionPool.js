const mysql = require('mysql2/promise');
const config = require('../../../config');

const pool = mysql.createPool({
  connectionLimit: config.DB.CONNECTION_LIMIT,
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.DATABASE_NAME,
  port: config.DB.DATABASE_PORT,
});

module.exports = pool;
