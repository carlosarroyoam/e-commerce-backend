import AuthDao from '#features/auth/auth.dao.js';

/**
 * AuthRepository class.
 */
class AuthRepository {
  /**
   * AuthRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.authDao = new AuthDao(this.connection);
  }

  /**
   * Gets a personal access token.
   *
   * @param {string} personal_access_token The personal access token.
   * @return {Promise} The query result.
   */
  async getPersonalAccessToken(personal_access_token) {
    const [[result]] = await this.authDao.getPersonalAccessToken(personal_access_token);

    return result;
  }

  /**
   * Gets all the expired personal access tokens.
   *
   * @return {Promise} The query result.
   */
  async getExpiredPersonalAccessTokens() {
    const [result] = await this.authDao.getExpiredPersonalAccessTokens();

    return result;
  }

  /**
   * Gets a personal access token by finger print.
   *
   * @param {string} fingerprint The token finger print.
   * @param {number} user_id The user id.
   * @return {Promise} The query result.
   */
  async getPersonalAccessTokenByFingerPrint(fingerprint, user_id) {
    const [[result]] = await this.authDao.getPersonalAccessTokenByFingerPrint(fingerprint, user_id);

    return result;
  }

  /**
   * Stores a personal access token.
   *
   * @param {any} personal_access_token The personal access token data.
   * @return {Promise} The query result.
   */
  async storePersonalAccessToken(personal_access_token) {
    const [result] = await this.authDao.storePersonalAccessToken(personal_access_token);

    return result.insertId;
  }

  /**
   * Updates a personal access token.
   *
   * @param {any} personal_access_token The personal access token data.
   * @param {number} personal_access_token_id The personal access token id.
   * @return {Promise} The query result.
   */
  async updatePersonalAccessToken(personal_access_token, personal_access_token_id) {
    const [result] = await this.authDao.updatePersonalAccessToken(
      personal_access_token,
      personal_access_token_id
    );

    return result.changedRows;
  }

  /**
   * Updates a personal access token.
   *
   * @param {string} personal_access_token The personal access token.
   * @return {Promise} The query result.
   */
  async deleteRefreshToken(personal_access_token) {
    const [result] = await this.authDao.deleteRefreshToken(personal_access_token);

    return result.changedRows;
  }
}

export default AuthRepository;
