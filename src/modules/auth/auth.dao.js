/**
 * Performs the SQL query to get a personal access token.
 *
 * @param {string} personalAccessToken The token
 * @param {number} user_id The user id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getPersonalAccessToken(personalAccessToken, user_id, connection) {
  const query = `SELECT id, fingerprint FROM personal_access_tokens
        WHERE user_id = ? AND token = ?`;

  return connection.query(query, [user_id, personalAccessToken]);
}

/**
 * Performs the SQL query to get all expired personal access token.
 *
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getExpiredPersonalAccessTokens(connection) {
  const query = `SELECT id FROM personal_access_tokens
        WHERE now() > created_at + INTERVAL 1 hour`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a personal access token by finger print.
 *
 * @param {string} fingerPrint The token finger print
 * @param {number} user_id The user id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getPersonalAccessTokenByFingerPrint(fingerPrint, user_id, connection) {
  const query = `SELECT id FROM personal_access_tokens
        WHERE user_id = ? AND fingerprint = ?`;

  return connection.query(query, [user_id, fingerPrint]);
}

/**
 * Performs the SQL query to store a personal access token.
 *
 * @param {any} personalAccessToken The personal access token data
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function storePersonalAccessToken(personalAccessToken, connection) {
  const query = `INSERT INTO personal_access_tokens SET ?`;

  return connection.query(query, [personalAccessToken]);
}

/**
 * Performs the SQL query to update a personal access token.
 *
 * @param {any} personalAccessToken The personal access token data
 * @param {number} personalAccessTokenId The personal access token id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function updatePersonalAccessToken(personalAccessToken, personalAccessTokenId, connection) {
  const query = `UPDATE personal_access_tokens SET ? WHERE id = ?`;

  return connection.query(query, [personalAccessToken, personalAccessTokenId]);
}

/**
 * Performs the SQL query to update a personal access token.
 *
 * @param {string} personalAccessToken The personal access token
 * @param {number} user_id The personal access token owner id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function deleteRefreshToken(personalAccessToken, user_id, connection) {
  const query = `DELETE FROM personal_access_tokens WHERE token = ? AND user_id = ?`;

  return connection.query(query, [personalAccessToken, user_id]);
}

module.exports = {
  getPersonalAccessToken,
  getExpiredPersonalAccessTokens,
  getPersonalAccessTokenByFingerPrint,
  storePersonalAccessToken,
  updatePersonalAccessToken,
  deleteRefreshToken,
};
