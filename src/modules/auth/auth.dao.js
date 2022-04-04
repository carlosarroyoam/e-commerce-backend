/**
 * AuthDao class.
 */
class AuthDao {
  /**
   * AuthDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get a personal access token.
   *
   * @param {string} personal_access_token The token.
   * @return {Promise} The query result.
   */
  async getPersonalAccessToken(personal_access_token) {
    const query = `SELECT id, fingerprint FROM personal_access_tokens
        WHERE token = ?`;

    return this.connection.query(query, [personal_access_token]);
  }

  /**
   * Performs the SQL query to get all expired personal access token.
   *
   * @return {Promise} The query result.
   */
  async getExpiredPersonalAccessTokens() {
    const query = `SELECT id FROM personal_access_tokens
        WHERE now() > created_at + INTERVAL 1 hour`;

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a personal access token by finger print.
   *
   * @param {string} fingerprint The token finger print.
   * @param {number} user_id The user id.
   * @return {Promise} The query result.
   */
  async getPersonalAccessTokenByFingerPrint(fingerprint, user_id) {
    const query = `SELECT id FROM personal_access_tokens
        WHERE user_id = ? AND fingerprint = ?`;

    return this.connection.query(query, [user_id, fingerprint]);
  }

  /**
   * Performs the SQL query to store a personal access token.
   *
   * @param {any} personal_access_token The personal access token data.
   * @return {Promise} The query result.
   */
  async storePersonalAccessToken(personal_access_token) {
    const query = `INSERT INTO personal_access_tokens SET ?`;

    return this.connection.query(query, [personal_access_token]);
  }

  /**
   * Performs the SQL query to update a personal access token.
   *
   * @param {any} personal_access_token The personal access token data.
   * @param {number} personal_access_token_id The personal access token id.
   * @return {Promise} The query result.
   */
  async updatePersonalAccessToken(personal_access_token, personal_access_token_id) {
    const query = `UPDATE personal_access_tokens SET ? WHERE id = ?`;

    return this.connection.query(query, [personal_access_token, personal_access_token_id]);
  }

  /**
   * Performs the SQL query to update a personal access token.
   *
   * @param {string} personal_access_token The personal access token.
   * @return {Promise} The query result.
   */
  async deleteRefreshToken(personal_access_token) {
    const query = `DELETE FROM personal_access_tokens WHERE token = ?`;

    return this.connection.query(query, [personal_access_token]);
  }
}

module.exports = AuthDao;
