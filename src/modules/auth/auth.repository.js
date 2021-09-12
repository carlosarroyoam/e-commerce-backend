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
   * Gets a personal access token.
   *
   * @param {string} personalAccessToken The personal access token
   * @param {number} user_id The user id
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async getPersonalAccessToken(personalAccessToken, user_id, connection) {
    const [[result]] = await this.authDao.getPersonalAccessToken(
      personalAccessToken,
      user_id,
      connection
    );

    return result;
  }

  /**
   * Gets all the expired personal access tokens.
   *
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async getExpiredPersonalAccessTokens(connection) {
    const [result] = await this.authDao.getExpiredPersonalAccessTokens(connection);

    return result;
  }

  /**
   * Gets a personal access token by finger print.
   *
   * @param {string} fingerPrint The token finger print
   * @param {number} user_id The user id
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async getPersonalAccessTokenByFingerPrint(fingerPrint, user_id, connection) {
    const [[result]] = await this.authDao.getPersonalAccessTokenByFingerPrint(
      fingerPrint,
      user_id,
      connection
    );

    return result;
  }

  /**
   * Stores a personal access token.
   *
   * @param {string} personalAccessToken The personal access token data
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async storePersonalAccessToken(personalAccessToken, connection) {
    const [result] = await this.authDao.storePersonalAccessToken(personalAccessToken, connection);

    return result.insertId;
  }

  /**
   * Updates a personal access token.
   *
   * @param {string} personalAccessToken The personal access token data
   * @param {number} personalAccessTokenId The personal access token id
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async updatePersonalAccessToken(personalAccessToken, personalAccessTokenId, connection) {
    const [result] = await this.authDao.updatePersonalAccessToken(
      personalAccessToken,
      personalAccessTokenId,
      connection
    );

    return result.changedRows;
  }

  /**
   * Updates a personal access token.
   *
   * @param {string} personalAccessToken The personal access token
   * @param {number} user_id The personal access token owner id
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async deleteRefreshToken(personalAccessToken, user_id, connection) {
    const [result] = await this.authDao.deleteRefreshToken(
      personalAccessToken,
      user_id,
      connection
    );

    return result.changedRows;
  }
}

module.exports = AuthRepository;
