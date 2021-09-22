const customerDao = require('./customer.dao');
const customerMapper = require('./customer.mapper');

/**
 * Retrieves all customer users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.order_by The order for the results.
 * @param {string} queryOptions.user_status The user status to query.
 * @param {string} queryOptions.search The search criteria.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAll = async ({ skip, limit, order_by, user_status, search }, connection) => {
  const [result] = await customerDao.getAll(
    { skip, limit, order_by, user_status, search },
    connection
  );

  return result;
};

/**
 * Retrieves a customer user by its id.
 *
 * @param {number} customer_id The id of the customer user to retrieve.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (customer_id, connection) => {
  const [[result]] = await customerDao.getById(customer_id, connection);

  return result;
};

/**
 * Retrieves a customer user by its email.
 *
 * @param {string} email The email of the customer user to retrieve.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByEmail = async (email, connection) => {
  const [[result]] = await customerDao.getByEmail(email, connection);

  return result;
};

/**
 * Stores a customer user.
 *
 * @param {object} customer The customer user to store.
 * @param {any} connection The database connection object.
 */
const store = async (customer, connection) => {
  const userDbEntity = customerMapper.toDatabaseEntity(customer);

  const [result] = await customerDao.create(userDbEntity, connection);

  return result.insertId;
};

/**
 * Updates a customer user by its id.
 *
 * @param {object} customer The customer user to update.
 * @param {number} customer_id
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
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
