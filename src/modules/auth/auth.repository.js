/**
 * Auth repository class.
 */
class AuthRepository {
  /**
   * Constructor for AuthRepository.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({ authDao }) {
    this.authDao = authDao;
  }

  /**
   * @param {string} email The user email to query
   * @param {any} connection
   * @returns {Promise} The query result
   */
  async findByEmail(email, connection) {
    const [result] = await this.authDao.getByEmail(email, connection);

    return result[0];
  }
}

module.exports = AuthRepository;
