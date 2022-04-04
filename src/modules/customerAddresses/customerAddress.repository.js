const CustomerAddressDao = require('./customerAddress.dao');
const customerAddressMapper = require('./customerAddress.mapper');

/**
 * CustomerAddressRepository class.
 */
class CustomerAddressRepository {
  /**
   * CustomerAddressRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.customerAddressDao = new CustomerAddressDao(this.connection);
  }

  /**
   * Retrieves customer address by its id.
   *
   * @param {number} customer_id The id of the customer.
   * @param {number} address_id The id of the address.
   * @return {Promise} The result of the query.
   */
  async findById(customer_id, address_id) {
    const [[result]] = await this.customerAddressDao.getById(customer_id, address_id);

    return result;
  }

  /**
   * Retrieves customer addresses by customer id.
   *
   * @param {number} customer_id The id of the customer user.
   * @return {Promise} The result of the query.
   */
  async findByCustomerId(customer_id) {
    const [result] = await this.customerAddressDao.getByCustomerId(customer_id);

    return result;
  }

  /**
   * Stores a customer address.
   *
   * @param {object} customerAddress The customer address to store.
   */
  async store(customerAddress) {
    const customerAddressDbEntity = customerAddressMapper.toDatabaseEntity(customerAddress);

    const [result] = await this.customerAddressDao.create(customerAddressDbEntity);

    return result.insertId;
  }

  /**
   * Updates a customer address by its id.
   *
   * @param {object} customer The customer address to update.
   * @param {number} address_id The id of the customer address.
   * @return {Promise} The result of the query.
   */
  async update(customer, address_id) {
    const customerAddressDbEntity = customerAddressMapper.toDatabaseEntity(customer);

    const [result] = await this.customerAddressDao.update(customerAddressDbEntity, address_id);

    return result.changedRows;
  }

  /**
   * Deletes a customer address by its id.
   *
   * @param {number} address_id The id of the customer address.
   * @return {Promise} The result of the query.
   */
  async deleteById(address_id) {
    const [result] = await this.customerAddressDao.deleteById(address_id);

    return result.changedRows;
  }
}

module.exports = CustomerAddressRepository;
