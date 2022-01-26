const customerAddresesDao = require('./customerAddress.dao');
const customerAddressMapper = require('./customerAddress.mapper');
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

/**
 * Stores a customer address.
 *
 * @param {object} customerAddress The customer address to store.
 * @param {any} connection The database connection object.
 */
const store = async (customerAddress, connection) => {
  const customerAddressDbEntity = customerAddressMapper.toDatabaseEntity(customerAddress);

  const [result] = await customerAddresesDao.create(customerAddressDbEntity, connection);

  return result.insertId;
};

/**
 * Updates a customer address by its id.
 *
 * @param {object} customer The customer address to update.
 * @param {number} address_id The id of the customer address.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const update = async (customer, address_id, connection) => {
  const customerAddressDbEntity = customerAddressMapper.toDatabaseEntity(customer);

  const [result] = await customerAddresesDao.update(
    customerAddressDbEntity,
    address_id,
    connection
  );

  return result.changedRows;
};

/**
 * Deletes a customer address by its id.
 *
 * @param {number} address_id
 * @param {any} connection
 * @return {Promise} The result of the query
 */
const deleteById = async (address_id, connection) => {
  const [result] = await customerAddresesDao.deleteById(address_id, connection);

  return result.changedRows;
};

module.exports = {
  findByCustomerId,
  findById,
  store,
  update,
  deleteById,
};
