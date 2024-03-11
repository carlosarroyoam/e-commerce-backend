import 'dotenv/config.js';
import Joi from 'joi';

const envSchema = Joi.object()
  .keys({
    APP_ENV: Joi.string().lowercase().valid('prod', 'dev', 'test').required(),
    APP_NAME: Joi.string().default('app'),
    APP_HOST: Joi.string().uri().default('http://localhost'),
    APP_PORT: Joi.number().default(3000),

    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(3306),
    DB_CONNECTION_LIMIT: Joi.number().min(1).max(50).default(1),

    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    JWT_REFRESH_SECRET_KEY: Joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
    JWT_PASSWORD_RECOVERY_SECRET_KEY: Joi.string().required(),
    JWT_PASSWORD_RECOVERY_EXPIRES_IN: Joi.string().required(),

    SALT_ROUNDS: Joi.number().min(1).max(50).default(10),
  })
  .unknown();

const { value: env, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  APP: {
    ENV: env.APP_ENV,
    NAME: env.APP_NAME,
    HOST: env.APP_HOST,
    PORT: env.APP_PORT,
  },
  DB: {
    CONNECTION_LIMIT: env.DB_CONNECTION_LIMIT,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    DATABASE_NAME: env.DB_NAME,
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
  },
  JWT: {
    SECRET_KEY: env.JWT_SECRET_KEY,
    EXPIRES_IN: env.JWT_EXPIRES_IN,
    REFRESH_SECRET_KEY: env.JWT_REFRESH_SECRET_KEY,
    REFRESH_EXPIRES_IN: env.JWT_REFRESH_EXPIRES_IN,
    PASSWORD_RECOVERY_SECRET_KEY: env.JWT_PASSWORD_RECOVERY_SECRET_KEY,
    PASSWORD_RECOVERY_EXPIRES_IN: env.JWT_PASSWORD_RECOVERY_EXPIRES_IN,
  },
  BCRYPT: {
    SALT_ROUNDS: env.SALT_ROUNDS,
  },
};
