const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const customerRepository = require('../customers/customer.repository');
const customerAddressRepository = require('./customerAddress.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all customer addresses.
 *
 * @param {number} customer_id The id of the customer to retrieve addresses
 * @return {Promise} The list of customer addresses.
 */
const findAll = async (customer_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const customerAddresses = await customerAddressRepository.findByCustomerId(
      customer_id,
      connection
    );

    connection.release();

    return customerAddresses;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving admins');
    }

    throw err;
  }
};

/**
 * Retrieves a customer address by its id.
 *
 * @param {number} customer_id The id of the customer.
 * @param {number} address_id The id of the address to retrieve.
 * @return {Promise} The user.
 */
const findById = async (customer_id, address_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const customerAddressById = await customerAddressRepository.findById(
      customer_id,
      address_id,
      connection
    );

    if (!customerAddressById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    connection.release();

    return customerAddressById;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving customer address');
    }

    throw err;
  }
};

/**
 * Stores a customer address.
 *
 * @param {object} customerAddress The address to store.
 * @param {number} customer_id The address to store.
 * @return {Promise} The created admin user.
 */
const store = async (customerAddress, customer_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    // TODO add no duplicate address validation
    const createdCustomerAddressId = await customerAddressRepository.store(
      { ...customerAddress, customer_id: customerById.id },
      connection
    );

    const customerAddressById = await customerAddressRepository.findById(
      customerById.id,
      createdCustomerAddressId,
      connection
    );

    connection.release();

    return customerAddressById;
  } catch (err) {
    if (connection) {
      connection.release();
    }

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while storing customer address');
    }

    throw err;
  }
};

/**
 * Updates a customer address by its id.
 *
 * @param {object} customer_address The customer address to update.
 * @param {number} customer_id The id of the customer.
 * @param {number} address_id The id of the customer address to update.
 * @return {Promise} The updated admin user.
 */
const update = async (customer_address, customer_id, address_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const customerAddressById = await customerAddressRepository.findById(
      customer_id,
      address_id,
      connection
    );

    if (!customerAddressById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    await customerAddressRepository.update(customer_address, address_id, connection);

    const updatedCustomerAddress = await customerAddressRepository.findById(
      customer_id,
      address_id,
      connection
    );

    connection.release();

    return updatedCustomerAddress;
  } catch (err) {
    if (connection) {
      connection.release();
    }

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while updating admin');
    }

    throw err;
  }
};

/**
 * Deletes a customer address by its id.
 *
 * @param {number} customer_id The id of the customer.
 * @param {number} address_id The id of the address to delete.
 * @return {Promise} The deleted address.
 */
const deleteById = async (customer_id, address_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const addressById = await customerAddressRepository.findById(
      customer_id,
      address_id,
      connection
    );

    if (!addressById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    await customerAddressRepository.deleteById(addressById.id, connection);

    connection.release();

    return addressById;
  } catch (err) {
    if (connection) {
      connection.release();
    }

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while updating admin');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  store,
  update,
  deleteById,
};
