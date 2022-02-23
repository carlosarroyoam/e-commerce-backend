const userDao = require('./user.dao');
const userMapper = require('./user.mapper');

/**
 * Retrieves all non-deleted/active users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.status The user status to query.
 * @param {string} queryOptions.search The search criteria.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const findAll = async ({ skip, limit, sort, status, search }, connection) => {
  const [result] = await userDao.getAll({ skip, limit, sort, status, search }, connection);

  return result;
};

/**
 * Retrieves a non-deleted/active user by its id.
 *
 * @param {number} user_id The id of the user to query.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const findById = async (user_id, connection) => {
  const [[result]] = await userDao.getById(user_id, connection);

  return result;
};

/**
 * Retrieves a non-deleted/active user by its email address.
 *
 * @param {string} email
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const findByEmail = async (email, connection) => {
  const [[result]] = await userDao.getByEmail(email, connection);

  return result;
};

/**
 * Stores a user.
 *
 * @param {object} user The user to store.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const store = async (user, connection) => {
  const userDbEntity = userMapper.toDatabaseEntity(user);

  const [result] = await userDao.create(userDbEntity, connection);

  return result.insertId;
};

/**
 * Updates a user.
 *
 * @param {object} user
 * @param {number} user_id The id of the user to update.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const update = async (user, user_id, connection) => {
  const userDbEntity = userMapper.toDatabaseEntity(user);

  const [result] = await userDao.update(userDbEntity, user_id, connection);

  return result.changedRows;
};

/**
 * Deletes a user.
 *
 * @param {number} user_id The id of the user to delete.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const deleteById = async (user_id, connection) => {
  const [result] = await userDao.deleteById(user_id, connection);

  return result.changedRows;
};

/**
 * Restores a user.
 *
 * @param {number} user_id The id of the user to restore.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const restore = async (user_id, connection) => {
  const [result] = await userDao.restore(user_id, connection);

  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  store,
  update,
  deleteById,
  restore,
};
