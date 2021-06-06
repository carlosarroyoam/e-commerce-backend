const bcrypt = require('bcrypt');

class BcryptHashing {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger.instance;
  }

  async hashPassword(plainTextPassword) {
    try {
      const passwordHash = await bcrypt.hash(plainTextPassword, this.config.BCRYPT.SALT_ROUNDS);

      return passwordHash;
    } catch (err) {
      this.logger.log({
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
      this.logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      return false;
    }
  }
}

module.exports = BcryptHashing;
