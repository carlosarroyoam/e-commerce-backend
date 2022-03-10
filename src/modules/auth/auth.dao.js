/**
 * Performs the SQL query to get a personal access token.
 *
 * @param {string} personal_access_token The token.
 * @param {any} connection The database connection.
 * @return {Promise} The query result.
 */
async function getPersonalAccessToken(personal_access_token, connection) {
  const query = `SELECT id, fingerprint FROM personal_access_tokens
        WHERE token = ?`;

  return connection.query(query, [personal_access_token]);
}

/**
 * Performs the SQL query to get all expired personal access token.
 *
 * @param {any} connection The database connection.
 * @return {Promise} The query result.
 */
async function getExpiredPersonalAccessTokens(connection) {
  const query = `SELECT id FROM personal_access_tokens
        WHERE now() > created_at + INTERVAL 1 hour`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a personal access token by finger print.
 *
 * @param {string} fingerprint The token finger print.
 * @param {number} user_id The user id.
 * @param {any} connection The database connection.
 * @return {Promise} The query result.
 */
async function getPersonalAccessTokenByFingerPrint(fingerprint, user_id, connection) {
  const query = `SELECT id FROM personal_access_tokens
        WHERE user_id = ? AND fingerprint = ?`;

  return connection.query(query, [user_id, fingerprint]);
}

/**
 * Performs the SQL query to store a personal access token.
 *
 * @param {any} personal_access_token The personal access token data.
 * @param {any} connection The database connection.
 * @return {Promise} The query result.
 */
async function storePersonalAccessToken(personal_access_token, connection) {
  const query = `INSERT INTO personal_access_tokens SET ?`;

  return connection.query(query, [personal_access_token]);
}

/**
 * Performs the SQL query to update a personal access token.
 *
 * @param {any} personal_access_token The personal access token data.
 * @param {number} personal_access_token_id The personal access token id.
 * @param {any} connection The database connection.
 * @return {Promise} The query result.
 */
async function updatePersonalAccessToken(
  personal_access_token,
  personal_access_token_id,
  connection
) {
  const query = `UPDATE personal_access_tokens SET ? WHERE id = ?`;

  return connection.query(query, [personal_access_token, personal_access_token_id]);
}

/**
 * Performs the SQL query to update a personal access token.
 *
 * @param {string} personal_access_token The personal access token.
 * @param {any} connection The database connection.
 * @return {Promise} The query result.
 */
async function deleteRefreshToken(personal_access_token, connection) {
  const query = `DELETE FROM personal_access_tokens WHERE token = ?`;

  return connection.query(query, [personal_access_token]);
}

module.exports = {
  getPersonalAccessToken,
  getExpiredPersonalAccessTokens,
  getPersonalAccessTokenByFingerPrint,
  storePersonalAccessToken,
  updatePersonalAccessToken,
  deleteRefreshToken,
};
