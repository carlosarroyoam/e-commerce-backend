const customerAddresesDao = require('./customerAddress.dao');

/**
 * Retrieves customer addresses by customer id.
 *
 * @param {number} customer_id The id of the customer user.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByCustomerId = async (customer_id, connection) => {
  const [result] = await customerAddresesDao.getByCustomerId(customer_id, connection);

  return result;
};

/**
 * Retrieves customer address by its id.
 *
 * @param {number} customer_id The id of the customer.
 * @param {number} address_id The id of the address.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (customer_id, address_id, connection) => {
  const [[result]] = await customerAddresesDao.getById(customer_id, address_id, connection);

  return result;
};

module.exports = {
  findByCustomerId,
  findById,
};
