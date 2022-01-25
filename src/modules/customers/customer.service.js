const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const customerRepository = require('./customer.repository');
const customerAddressRepository = require('../customerAddresses/customerAddress.repository');
const customerContactDetailRepository = require('../customerContactDetails/customersContactDetail.repository');
const userRepository = require('../users/user.repository');
const sharedErrors = require('../../shared/errors');
const userRoles = require('../auth/roles');
const bcrypt = require('../../shared/lib/bcrypt');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all customer users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.status The user status to query.
 * @param {string} queryOptions.search The search criteria.
 * @return {Promise} The list of customers.
 */
const findAll = async ({ skip, limit, sort, status, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const rawCustomers = await customerRepository.findAll(
      { skip, limit, sort, status, search },
      connection
    );

    const customers = await Promise.all(
      rawCustomers.map(async (customer) => {
        const addressesByCustomerId = await customerAddressRepository.findByCustomerId(
          customer.id,
          connection
        );

        const contactDetailByCustomerId = await customerContactDetailRepository.findByCustomerId(
          customer.id,
          connection
        );

        return {
          ...customer,
          contactInfo: contactDetailByCustomerId,
          addresses: addressesByCustomerId,
        };
      })
    );

    connection.release();

    return customers;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving customers');
    }

    throw err;
  }
};

/**
 * Retrieves a customer user by its id.
 *
 * @param {number} customer_id The id of the customer user to retrieve.
 * @return {Promise} The customer user.
 */
const findById = async (customer_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.UserNotFoundError();
    }

    const addressesByCustomerId = await customerAddressRepository.findByCustomerId(
      customer_id,
      connection
    );

    const contactDetailByCustomerId = await customerContactDetailRepository.findByCustomerId(
      customer_id,
      connection
    );

    connection.release();

    return {
      ...customerById,
      contactInfo: contactDetailByCustomerId,
      addresses: addressesByCustomerId,
    };
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving customer');
    }

    throw err;
  }
};

/**
 * Stores a customer user.
 *
 * @param {object} customer The customer user to store.
 * @return {Promise} The created customer user.
 */
const store = async (customer) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    connection.beginTransaction();

    const customerByEmail = await userRepository.findByEmail(customer.email, connection);

    if (customerByEmail) {
      throw new sharedErrors.EmailAlreadyTakenError({
        email: customer.email,
      });
    }

    const passwordHash = await bcrypt.hashPassword(customer.password);

    const createdUserId = await userRepository.store(
      {
        ...customer,
        password: passwordHash,
        user_role_id: userRoles.customer.id,
      },
      connection
    );

    const createdCustomerId = await customerRepository.store(
      {
        user_id: createdUserId,
      },
      connection
    );

    const createdCustomer = await customerRepository.findById(createdCustomerId, connection);

    connection.commit();

    connection.release();

    return createdCustomer;
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

      throw new Error('Error while storing customer');
    }

    throw err;
  }
};

/**
 * Updates a customer user by its id.
 *
 * @param {number} customer_id The id of the customer user to update.
 * @param {object} customer The customer user to store.
 * @return {Promise} The updated customer user.
 */
const update = async (customer_id, customer) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    connection.beginTransaction();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.UserNotFoundError();
    }

    if (customerById.deleted_at !== null) {
      throw new sharedErrors.BadRequestError({
        message: 'The user account is disabled',
      });
    }

    await userRepository.update(
      {
        ...customer,
      },
      customerById.user_id,
      connection
    );

    const updatedCustomer = await customerRepository.findById(customer_id, connection);

    connection.commit();

    connection.release();

    return updatedCustomer;
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

      throw new Error('Error while updating customer');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  store,
  update,
};
