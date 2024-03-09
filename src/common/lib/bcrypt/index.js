import bcrypt from 'bcrypt';
import config from '#common/config/index.js';

/**
 * @param {string | Buffer} plainTextPassword the plain text password.
 * @return {Promise<string>} The password hashed.
 */
async function hashPassword(plainTextPassword) {
  const hash = await bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS);

  return hash;
}

/**
 * @param {string | Buffer} plainTextPassword the plain text password.
 * @param {string} passwordHash the password hash to compare.
 * @return {Promise<boolean>}
 */
async function compare(plainTextPassword, passwordHash) {
  const match = await bcrypt.compare(plainTextPassword, passwordHash);

  return match;
}

export default {
  hashPassword,
  compare,
};
