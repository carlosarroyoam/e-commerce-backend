require('dotenv').config();

const DEVELOPMENT = require('./development');
const PRODUCTION = require('./production');
const TESTING = require('./testing');

const { APP_ENV } = process.env;

let currentEnv = DEVELOPMENT;

if (APP_ENV === 'production') {
  currentEnv = PRODUCTION;
} else if (APP_ENV === 'testing') {
  currentEnv = TESTING;
}

module.exports = currentEnv;
