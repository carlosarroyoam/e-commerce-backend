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
      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      return null;
    }
  }

  async compare(plainTextPassword, passwordHash) {
    try {
      return bcrypt.compare(plainTextPassword, passwordHash);
    } catch (err) {
      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      return false;
    }
  }
}

module.exports = BcryptHashing;
