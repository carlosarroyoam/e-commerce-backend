const CustomerDao = require('./customer.dao');
const customerMapper = require('./customer.mapper');

/**
 * CustomerRepository class.
 */
class CustomerRepository {
  /**
   * CustomerRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.customerDao = new CustomerDao(this.connection);
  }

  /**
   * Retrieves all customer users.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.skip The query skip.
   * @param {number} queryOptions.limit The query limit.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.status The user status to query.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The result of the query.
   */
  async findAll({ skip, limit, sort, status, search }) {
    const [result] = await this.customerDao.getAll({
      skip,
      limit,
      sort,
      status,
      search,
    });

    return result;
  }

  /**
   * Retrieves a customer user by its id.
   *
   * @param {number} customer_id The id of the customer user to retrieve.
   * @return {Promise} The result of the query.
   */
  async findById(customer_id) {
    const [[result]] = await this.customerDao.getById(customer_id);

    return result;
  }

  /**
   * Retrieves a customer user by its email.
   *
   * @param {string} email The email of the customer user to retrieve.
   * @return {Promise} The result of the query.
   */
  async findByEmail(email) {
    const [[result]] = await this.customerDao.getByEmail(email);

    return result;
  }

  /**
   * Stores a customer user.
   *
   * @param {object} customer The customer user to store.
   */
  async store(customer) {
    const userDbEntity = customerMapper.toDatabaseEntity(customer);

    const [result] = await this.customerDao.create(userDbEntity);

    return result.insertId;
  }

  /**
   * Updates a customer user by its id.
   *
   * @param {object} customer The customer user to update.
   * @param {number} customer_id The id of the customer.
   * @return {Promise} The result of the query.
   */
  async update(customer, customer_id) {
    const userDbEntity = customerMapper.toDatabaseEntity(customer);

    const [result] = await this.customerDao.update(userDbEntity, customer_id);

    return result.changedRows;
  }
}

module.exports = CustomerRepository;
