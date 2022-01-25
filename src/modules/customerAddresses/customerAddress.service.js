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
 * @param {number} customerId The address to store.
 * @return {Promise} The created admin user.
 */
const store = async (customerAddress, customerId) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerAddressRepository.findById(customerId, connection);

    // TODO add customer address properties
    const createdCustomerAddressId = await customerAddressRepository.store(
      {
        customerAddress,
        customer_id: customerById.id,
      },
      connection
    );

    const createdCustomerAddress = await customerAddressRepository.findById(
      createdCustomerAddressId,
      connection
    );

    connection.release();

    return createdCustomerAddress;
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
 * Updates a admin user by its id.
 *
 * @param {number} admin_id The id of the admin user to update.
 * @param {object} admin The admin user to store.
 * @return {Promise} The updated admin user.
 */
const update = async (admin_id, admin) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    connection.beginTransaction();

    const adminById = await customerRepository.findById(admin_id, connection);

    if (!adminById) {
      throw new sharedErrors.UserNotFoundError();
    }

    if (adminById.deleted_at !== null) {
      throw new sharedErrors.BadRequestError({
        message: 'The user account is disabled',
      });
    }

    await customerAddressRepository.update(
      {
        ...admin,
      },
      adminById.user_id,
      connection
    );

    const updatedAdmin = await customerRepository.findById(admin_id, connection);

    connection.commit();

    connection.release();

    return updatedAdmin;
  } catch (err) {
    if (connection) {
      connection.rollback();

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
 * @param {number} admin_id The id of the admin user to update.
 * @param {object} admin The admin user to store.
 * @return {Promise} The updated admin user.
 */
const deleteById = async (admin_id, admin) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    connection.beginTransaction();

    const adminById = await customerRepository.findById(admin_id, connection);

    if (!adminById) {
      throw new sharedErrors.UserNotFoundError();
    }

    if (adminById.deleted_at !== null) {
      throw new sharedErrors.BadRequestError({
        message: 'The user account is disabled',
      });
    }

    await customerAddressRepository.update(
      {
        ...admin,
      },
      adminById.user_id,
      connection
    );

    const updatedAdmin = await customerRepository.findById(admin_id, connection);

    connection.commit();

    connection.release();

    return updatedAdmin;
  } catch (err) {
    if (connection) {
      connection.rollback();

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
