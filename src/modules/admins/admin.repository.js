const adminDao = require('./admin.dao');
const adminMapper = require('./admin.mapper');

/**
 * Retrieves all admin users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.order_by The order for the results.
 * @param {string} queryOptions.user_status The user status to query.
 * @param {string} queryOptions.search The search criteria.
 * @param {*} connection The database connection object. The database connection object.
 * @return {Promise} The result of the query.
 */
const findAll = async ({ skip, limit, order_by, user_status, search }, connection) => {
  const [result] = await adminDao.getAll(
    { skip, limit, order_by, user_status, search },
    connection
  );

  return result;
};

/**
 * Retrieves a admin user by its id.
 *
 * @param {number} admin_id The id of the admin user to retrieve.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (admin_id, connection) => {
  const [[result]] = await adminDao.getById(admin_id, connection);

  return result;
};

/**
 * Retrieves a admin user by its email.
 *
 * @param {string} email The email of the admin user to retrieve.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByEmail = async (email, connection) => {
  const [[result]] = await adminDao.getByEmail(email, connection);

  return result;
};

/**
 * Stores a admin user.
 *
 * @param {object} admin The admin user to store.
 * @param {any} connection The database connection object.
 */
const store = async (admin, connection) => {
  const userDbEntity = adminMapper.toDatabaseEntity(admin);

  const [result] = await adminDao.create(userDbEntity, connection);

  return result.insertId;
};

/**
 * Updates a admin user by its id.
 *
 * @param {object} admin The admin user to update.
 * @param {number} admin_id The id of the admin user to update.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const update = async (admin, admin_id, connection) => {
  const userDbEntity = adminMapper.toDatabaseEntity(admin);

  const [result] = await adminDao.update(userDbEntity, admin_id, connection);

  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  store,
  update,
};
