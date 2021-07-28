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
   * Retrieves a user by its email address.
   *
   * @param {string} email The user email to query
   * @param {any} connection The database connection
   * @return {Promise} The query result
   */
  async findByEmailWithTrashed(email, connection) {
    const [result] = await this.authDao.getByEmailWithTrashed(email, connection);

    return result[0];
  }

  /**
   * Retrieves a non-deleted/active user by its id.
   *
   * @param {number} id The user id to query
   * @param {any} connection The database connection
   * @return {Promise} The result of the query
   */
  async findById(id, connection) {
    const [result] = await this.authDao.getById(id, connection);

    return result[0];
  }

  /**
   * Retrieves a user by its id.
   *
   * @param {number} id The user id to query
   * @param {any} connection The database connection
   * @return {Promise} The result of the query
   */
  async findByIdWithTrashed(id, connection) {
    const [result] = await this.authDao.getByIdWithTrashed(id, connection);

    return result[0];
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
    const [result] = await this.authDao.getPersonalAccessToken(
      personalAccessToken,
      user_id,
      connection
    );

    return result[0];
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
    const [result] = await this.authDao.getPersonalAccessTokenByFingerPrint(
      fingerPrint,
      user_id,
      connection
    );

    return result[0];
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

    return result.affectedRows;
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

    return result.affectedRows;
  }
}

module.exports = AuthRepository;
