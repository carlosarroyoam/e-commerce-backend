const bcrypt = require('bcrypt');
const config = require('../../../config');

/**
 * @param {string | Buffer} plainTextPassword
 */
async function hashPassword(plainTextPassword) {
  const hash = bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS);

  return hash;
}

/**
 * @param {string | Buffer} plainTextPassword
 * @param {string} passwordHash
 */
async function compare(plainTextPassword, passwordHash) {
  const match = bcrypt.compare(plainTextPassword, passwordHash);

  return match;
}

module.exports = {
  hashPassword,
  compare,
};
