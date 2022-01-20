const customerAddresesDao = require('./customersContactDetail.dao');

/**
 * Retrieves customer contact details by customer id.
 *
 * @param {number} customer_id The id of the customer user.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByCustomerId = async (customer_id, connection) => {
  const [[result]] = await customerAddresesDao.getByCustomerId(customer_id, connection);

  return result;
};

module.exports = {
  findByCustomerId,
};
