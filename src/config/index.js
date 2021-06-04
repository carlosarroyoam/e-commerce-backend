require('dotenv').config();

module.exports = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_NAME: process.env.APP_NAME || 'app',
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT || 3000,
  DB: {
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  JWT: {
    SECRET: process.env.PASSPORT_SECRET,
  },
};
