const AuthDao = require('./auth.dao');
const UserMapper = require('../users/mappers/user.mapper');

/**
 * Auth repository class.
 */
class AuthRepository {
  /**
   *
   * @param {any} connection
   */
  constructor(connection) {
    this._authDao = new AuthDao(connection);
    this._userMapper = new UserMapper();
  }

  /**
   *
   * @param {string} email The user email to query
   * @returns {Promise} The query result
   */
  async findByEmail(email) {
    const [result] = await this._authDao.getByEmail(email);

    return result[0];
  }
}

module.exports = AuthRepository;
