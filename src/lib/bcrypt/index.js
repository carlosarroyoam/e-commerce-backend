const bcrypt = require('bcrypt');

const saltRounds = 10;

class BcryptHashing {
  constructor({ logger }) {
    this._logger = logger.instance;
  }

  async hashPassword(plainTextPassword) {
    try {
      const passwordHash = await bcrypt.hash(plainTextPassword, saltRounds);

      return passwordHash;
    } catch (err) {
      this._logger.log('error', err.message);

      return null;
    }
  }

  async compare(plainTextPassword, passwordHash) {
    try {
      const result = await bcrypt.compare(plainTextPassword, passwordHash);

      return result;
    } catch (err) {
      this._logger.log('error', err.message);

      return false;
    }
  }
}

module.exports = BcryptHashing;