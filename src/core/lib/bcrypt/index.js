import bcrypt from 'bcrypt';

import config from '#core/config/index.js';

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {string | Buffer} plainTextPassword the plain text password.
 * @return {Promise<string>} The password hashed.
 */
async function hashPassword(plainTextPassword) {
  const hash = await bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS);

  return hash;
}

/**
 * Compares a plain text password against a bcrypt password hash.
 *
 * @param {string | Buffer} plainTextPassword the plain text password.
 * @param {string} passwordHash the password hash to compare.
 * @return {Promise<boolean>} Whether the password matches the hash.
 */
async function compare(plainTextPassword, passwordHash) {
  const match = await bcrypt.compare(plainTextPassword, passwordHash);

  return match;
}

export default {
  hashPassword,
  compare,
};
