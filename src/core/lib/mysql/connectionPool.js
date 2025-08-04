import mysql from 'mysql2/promise';
import config from '#core/config/index.js';

const pool = mysql.createPool({
  connectionLimit: config.DB.CONNECTION_LIMIT,
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.DATABASE_NAME,
  port: config.DB.PORT,
});

export default pool;
