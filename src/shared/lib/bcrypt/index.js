const bcrypt = require('bcrypt');
const config = require('../../../config');

/**
 * @param {string | Buffer} plainTextPassword
 */
async function hashPassword(plainTextPassword) {
  return new Promise((resolve, reject) =>
    bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS, function (err, hash) {
      if (err) return reject(err);

      return resolve(hash);
    })
  );
}

/**
 * @param {string | Buffer} plainTextPassword
 * @param {string} passwordHash
 */
async function compare(plainTextPassword, passwordHash) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(plainTextPassword, passwordHash, function (err, result) {
      if (err) return reject(err);

      return resolve(result);
    })
  );
}

module.exports = {
  hashPassword,
  compare,
};
