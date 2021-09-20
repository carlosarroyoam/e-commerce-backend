const adminDao = require('./admin.dao');
const adminMapper = require('./admin.mapper');

/**
 * @param {any} connection
 * @return {Promise} The query result
 */
const findAll = async ({ skip, limit, order_by, user_status, search }, connection) => {
  const [result] = await adminDao.getAll(
    { skip, limit, order_by, user_status, search },
    connection
  );

  return result;
};

/**
 * Retrieves a non-deleted/active user by its id.
 *
 * @param {number} admin_id
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const findById = async (admin_id, connection) => {
  const [[result]] = await adminDao.getById(admin_id, connection);

  return result;
};

/**
 * @param {string} email
 * @param {any} connection
 * @return {Promise} The query result
 */
const findByEmail = async (email, connection) => {
  const [[result]] = await adminDao.getByEmail(email, connection);

  return result;
};

/**
 * @param {object} user
 * @param {any} connection
 */
const store = async (user, connection) => {
  const userDbEntity = adminMapper.toDatabaseEntity(user);

  const [result] = await adminDao.create(userDbEntity, connection);

  return result.insertId;
};

/**
 * @param {object} user
 * @param {number} user_id
 * @param {any} connection
 * @return {Promise} The query result
 */
const update = async (user, user_id, connection) => {
  const userDbEntity = adminMapper.toDatabaseEntity(user);

  const [result] = await adminDao.update(userDbEntity, user_id, connection);

  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  store,
  update,
};
