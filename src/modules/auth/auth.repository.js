const authDao = require('./auth.dao');

/**
 * Gets a personal access token.
 *
 * @param {string} personalAccessToken The personal access token
 * @param {number} user_id The user id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const getPersonalAccessToken = async (personalAccessToken, user_id, connection) => {
  const [[result]] = await authDao.getPersonalAccessToken(personalAccessToken, user_id, connection);

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
 * @param {string} fingerPrint The token finger print
 * @param {number} user_id The user id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const getPersonalAccessTokenByFingerPrint = async (fingerPrint, user_id, connection) => {
  const [[result]] = await authDao.getPersonalAccessTokenByFingerPrint(
    fingerPrint,
    user_id,
    connection
  );

  return result;
};

/**
 * Stores a personal access token.
 *
 * @param {any} personalAccessToken The personal access token data
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const storePersonalAccessToken = async (personalAccessToken, connection) => {
  const [result] = await authDao.storePersonalAccessToken(personalAccessToken, connection);

  return result.insertId;
};

/**
 * Updates a personal access token.
 *
 * @param {any} personalAccessToken The personal access token data
 * @param {number} personalAccessTokenId The personal access token id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const updatePersonalAccessToken = async (
  personalAccessToken,
  personalAccessTokenId,
  connection
) => {
  const [result] = await authDao.updatePersonalAccessToken(
    personalAccessToken,
    personalAccessTokenId,
    connection
  );

  return result.changedRows;
};

/**
 * Updates a personal access token.
 *
 * @param {string} personalAccessToken The personal access token
 * @param {number} user_id The personal access token owner id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
const deleteRefreshToken = async (personalAccessToken, user_id, connection) => {
  const [result] = await authDao.deleteRefreshToken(personalAccessToken, user_id, connection);

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
