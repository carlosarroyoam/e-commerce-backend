const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const CustomerRepository = require('../customers/customer.repository');
const CustomerAddressRepository = require('./customerAddress.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * CustomerAddressService class.
 */
class CustomerAddressService {
  /**
   * Retrieves all customer addresses.
   *
   * @param {number} customer_id The id of the customer to retrieve addresses.
   * @return {Promise} The list of customer addresses.
   */
  async findAll(customer_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const customerRepository = new CustomerRepository(connection);
      const customerAddressRepository = new CustomerAddressRepository(connection);

      const customerById = await customerRepository.findById(customer_id);

      if (!customerById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const customerAddresses = await customerAddressRepository.findByCustomerId(customer_id);

      connection.release();

      return customerAddresses;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError({
          message: 'Error while retrieving customer addresses',
        });
      }

      throw err;
    }
  }

  /**
   * Retrieves a customer address by its id.
   *
   * @param {number} customer_id The id of the customer.
   * @param {number} address_id The id of the address to retrieve.
   * @return {Promise} The user.
   */
  async findById(customer_id, address_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const customerRepository = new CustomerRepository(connection);
      const customerAddressRepository = new CustomerAddressRepository(connection);

      const customerById = await customerRepository.findById(customer_id);

      if (!customerById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const customerAddressById = await customerAddressRepository.findById(customer_id, address_id);

      if (!customerAddressById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      connection.release();

      return customerAddressById;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError({
          message: 'Error while retrieving customer address',
        });
      }

      throw err;
    }
  }

  /**
   * Stores a customer address.
   *
   * @param {object} customerAddress The address to store.
   * @param {number} customer_id The address to store.
   * @return {Promise} The created admin user.
   */
  async store(customerAddress, customer_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const customerRepository = new CustomerRepository(connection);
      const customerAddressRepository = new CustomerAddressRepository(connection);

      const customerById = await customerRepository.findById(customer_id);

      if (!customerById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      // TODO add no duplicate address validation
      const createdCustomerAddressId = await customerAddressRepository.store({
        ...customerAddress,
        customer_id: customerById.id,
      });

      const customerAddressById = await customerAddressRepository.findById(
        customerById.id,
        createdCustomerAddressId
      );

      connection.release();

      return customerAddressById;
    } catch (err) {
      if (connection) {
        connection.release();
      }

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError({
          message: 'Error while storing customer address',
        });
      }

      throw err;
    }
  }

  /**
   * Updates a customer address by its id.
   *
   * @param {object} customer_address The customer address to update.
   * @param {number} customer_id The id of the customer.
   * @param {number} address_id The id of the customer address to update.
   * @return {Promise} The updated admin user.
   */
  async update(customer_address, customer_id, address_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const customerRepository = new CustomerRepository(connection);
      const customerAddressRepository = new CustomerAddressRepository(connection);

      const customerById = await customerRepository.findById(customer_id);

      if (!customerById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const customerAddressById = await customerAddressRepository.findById(customer_id, address_id);

      if (!customerAddressById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      await customerAddressRepository.update(customer_address, address_id);

      const updatedCustomerAddress = await customerAddressRepository.findById(
        customer_id,
        address_id
      );

      connection.release();

      return updatedCustomerAddress;
    } catch (err) {
      if (connection) {
        connection.release();
      }

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError({
          message: 'Error while updating customer address',
        });
      }

      throw err;
    }
  }

  /**
   * Deletes a customer address by its id.
   *
   * @param {number} customer_id The id of the customer.
   * @param {number} address_id The id of the address to delete.
   * @return {Promise} The deleted address.
   */
  async deleteById(customer_id, address_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const customerRepository = new CustomerRepository(connection);
      const customerAddressRepository = new CustomerAddressRepository(connection);

      const customerById = await customerRepository.findById(customer_id);

      if (!customerById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const addressById = await customerAddressRepository.findById(customer_id, address_id);

      if (!addressById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      await customerAddressRepository.deleteById(addressById.id);

      connection.release();

      return addressById;
    } catch (err) {
      if (connection) {
        connection.release();
      }

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError({
          message: 'Error while deleting customer address',
        });
      }

      throw err;
    }
  }
}
module.exports = new CustomerAddressService();
