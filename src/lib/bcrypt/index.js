const bcrypt = require('bcrypt');
const config = require('../../config');

async function hashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS);
}

async function compare(plainTextPassword, passwordHash) {
  return bcrypt.compare(plainTextPassword, passwordHash);
}

module.exports = {
  hashPassword,
  compare,
};
