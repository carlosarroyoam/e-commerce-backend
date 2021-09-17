const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const customerRepository = require('./customer.repository');
const userRepository = require('../users/user.repository');
const sharedErrors = require('../../shared/errors');
const userRoles = require('../auth/roles');
const bcrypt = require('../../shared/lib/bcrypt');
const logger = require('../../shared/lib/winston/logger');

/**
 *
 */
const findAll = async ({ sort, status, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customers = await customerRepository.findAll(
      { order_by: sort, user_status: status, search },
      connection
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
 * @param {number} customer_id
 */
const find = async (customer_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const customerById = await customerRepository.findById(customer_id, connection);

    if (!customerById) {
      throw new sharedErrors.UserNotFoundError();
    }

    connection.release();

    return customerById;
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
 * @param {object} customer
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

    const createdCustomer_id = await customerRepository.store(
      {
        user_id: createdUserId,
      },
      connection
    );

    const createdCustomer = await customerRepository.findById(createdCustomer_id, connection);

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
 * @param {number} customer_id
 * @param {object} customer
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
      throw new sharedErrors.BadRequest({
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
  find,
  store,
  update,
};
