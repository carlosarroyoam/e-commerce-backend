const authDao = require('./auth.dao');

/**
 * Gets a personal access token.
 *
 * @param {string} personal_access_token The personal access token
 * @param {number} user_id The user id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const getPersonalAccessToken = async (personal_access_token, user_id, connection) => {
  const [[result]] = await authDao.getPersonalAccessToken(
    personal_access_token,
    user_id,
    connection
  );

  return result;
};

/**
 * Gets all the expired personal access tokens.
 *
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const getExpiredPersonalAccessTokens = async (connection) => {
  const [result] = await authDao.getExpiredPersonalAccessTokens(connection);

  return result;
};

/**
 * Gets a personal access token by finger print.
 *
 * @param {string} fingerprint The token finger print
 * @param {number} user_id The user id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const getPersonalAccessTokenByFingerPrint = async (fingerprint, user_id, connection) => {
  const [[result]] = await authDao.getPersonalAccessTokenByFingerPrint(
    fingerprint,
    user_id,
    connection
  );

  return result;
};

/**
 * Stores a personal access token.
 *
 * @param {any} personal_access_token The personal access token data
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const storePersonalAccessToken = async (personal_access_token, connection) => {
  const [result] = await authDao.storePersonalAccessToken(personal_access_token, connection);

  return result.insertId;
};

/**
 * Updates a personal access token.
 *
 * @param {any} personal_access_token The personal access token data
 * @param {number} personal_access_token_id The personal access token id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const updatePersonalAccessToken = async (
  personal_access_token,
  personal_access_token_id,
  connection
) => {
  const [result] = await authDao.updatePersonalAccessToken(
    personal_access_token,
    personal_access_token_id,
    connection
  );

  return result.changedRows;
};

/**
 * Updates a personal access token.
 *
 * @param {string} personal_access_token The personal access token
 * @param {number} user_id The personal access token owner id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const deleteRefreshToken = async (personal_access_token, user_id, connection) => {
  const [result] = await authDao.deleteRefreshToken(personal_access_token, user_id, connection);

  return result.changedRows;
};

module.exports = {
  getPersonalAccessToken,
  getExpiredPersonalAccessTokens,
  getPersonalAccessTokenByFingerPrint,
  storePersonalAccessToken,
  updatePersonalAccessToken,
  deleteRefreshToken,
};
