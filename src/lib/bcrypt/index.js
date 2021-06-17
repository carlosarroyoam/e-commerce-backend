const bcrypt = require('bcrypt');
const config = require('../../config');

async function hashPassword(plainTextPassword) {
  try {
    const passwordHash = await bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS);

    return passwordHash;
  } catch (err) {
    return null;
  }
}

async function compare(plainTextPassword, passwordHash) {
  try {
    return bcrypt.compare(plainTextPassword, passwordHash);
  } catch (err) {
    return false;
  }
}

module.exports = {
  hashPassword,
  compare,
};
