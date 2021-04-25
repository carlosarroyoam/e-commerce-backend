require('dotenv').config();

const DEVELOPMENT = require('./development');
const PRODUCTION = require('./production');
const TESTING = require('./testing');

const { NODE_ENV } = process.env;

const currentEnv = DEVELOPMENT;

if (NODE_ENV === 'production') {
  currentEnv = PRODUCTION;
} else if (NODE_ENV === 'testing') {
  currentEnv = TESTING;
}

module.exports = currentEnv;
