require('dotenv').config();

module.exports = {
  APP_ENV: process.env.APP_ENV || 'development',
  APP_NAME: process.env.APP_NAME || 'app',
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT || 3000,
  DB: {
    CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE_NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
  BCRYPT: {
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  },
};
