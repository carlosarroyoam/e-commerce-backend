const userDao = require('./user.dao');
const userMapper = require('./user.mapper');

/**
 * Retrieves all non-deleted/active users.
 *
 * @return {Promise} The result of the query
 * @param {any} connection
 */
const findAll = async ({ skip, order_by, user_status, search }, connection) => {
  const [result] = await userDao.getAll({ skip, order_by, user_status, search }, connection);

  return result;
};

/**
 * Retrieves a non-deleted/active user by its id.
 *
 * @param {number} user_id
 * @param {any} connection
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
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const findByEmail = async (email, connection) => {
  const [[result]] = await userDao.getByEmail(email, connection);

  return result;
};

/**
 * Retrieves a deleted/non-active user by its email address.
 *
 * @param {string} email
 * @return {Promise} The result of the query
 * @param {any} connection
 */
const findByEmailWithTrashed = async (email, connection) => {
  const [[result]] = await userDao.getByEmailWithTrashed(email, connection);

  return result;
};

/**
 * Stores a user.
 *
 * @param {object} user
 * @param {any} connection
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
 * @param {number} id
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const update = async (user, id, connection) => {
  const userDbEntity = userMapper.toDatabaseEntity(user);

  const [result] = await userDao.update(userDbEntity, id, connection);

  return result.changedRows;
};

/**
 * Deletes a user.
 *
 * @param {number} id
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const remove = async (id, connection) => {
  const [result] = await userDao.inactivate(id, connection);

  return result.changedRows;
};

/**
 * Restores a user.
 *
 * @param {number} id
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const restore = async (id, connection) => {
  const [result] = await userDao.restore(id, connection);

  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  findByEmailWithTrashed,
  store,
  update,
  remove,
  restore,
};
