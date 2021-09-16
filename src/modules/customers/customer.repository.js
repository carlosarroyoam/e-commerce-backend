const customerDao = require('./customer.dao');
const customerMapper = require('./customer.mapper');

/**
 * @param {any} connection
 * @return {Promise} The query result
 */
const findAll = async ({ order_by, user_status, search }, connection) => {
  const [result] = await customerDao.getAll({ order_by, user_status, search }, connection);

  return result;
};

/**
 * Retrieves a non-deleted/active user by its id.
 *
 * @param {number} customer_id
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const findById = async (customer_id, connection) => {
  const [[result]] = await customerDao.getById(customer_id, connection);

  return result;
};

/**
 * @param {string} email
 * @param {any} connection
 * @return {Promise} The query result
 */
const findByEmail = async (email, connection) => {
  const [[result]] = await customerDao.getByEmail(email, connection);

  return result;
};

/**
 * @param {object} customer
 * @param {any} connection
 */
const store = async (customer, connection) => {
  const userDbEntity = customerMapper.toDatabaseEntity(customer);

  const [result] = await customerDao.create(userDbEntity, connection);

  return result.insertId;
};

/**
 * @param {object} customer
 * @param {number} customer_id
 * @param {any} connection
 * @return {Promise} The query result
 */
const update = async (customer, customer_id, connection) => {
  const userDbEntity = customerMapper.toDatabaseEntity(customer);

  const [result] = await customerDao.update(userDbEntity, customer_id, connection);

  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  store,
  update,
};
