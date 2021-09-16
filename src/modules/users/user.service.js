const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const userRepository = require('./user.repository');
const userErrors = require('./errors/');
const sharedErrors = require('../../shared/errors');
const bcrypt = require('../../shared/lib/bcrypt');
const logger = require('../../shared/lib/winston/logger');

/**
 * @param {object} data The query options
 */
const findAll = async ({ skip, sort, status, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const users = await userRepository.findAll(
      { skip, order_by: sort, user_status: status, search },
      connection
    );

    connection.release();

    return users;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving users');
    }

    throw err;
  }
};

/**
 * @param {number} user_id The user_id to find
 */
const find = async (user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new userErrors.UserNotFoundError();
    }

    connection.release();

    return userById;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving user');
    }

    throw err;
  }
};

/**
 * @param {number} user_id The user_id to delete
 * @param {number} auth_user_id The user_id who make the request
 */
const remove = async (user_id, auth_user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new userErrors.UserNotFoundError();
    }

    if (userById.deleted_at !== null) {
      throw new sharedErrors.BadRequest({
        message: 'The user is already inactive',
      });
    }

    if (auth_user_id === userById.id) {
      throw new sharedErrors.BadRequest({
        message: 'A user cannot deactivate to itself',
      });
    }

    const changedRows = await userRepository.remove(user_id, connection);

    if (changedRows < 1) {
      throw new Error('User was not deleted');
    }

    connection.release();

    return user_id;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while deleting user');
    }

    throw err;
  }
};

/**
 * @param {number} user_id The user_id to restore
 * @param {number} auth_user_id The user_id who make the request
 */
const restore = async (user_id, auth_user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new userErrors.UserNotFoundError();
    }

    if (userById.deleted_at === null) {
      throw new sharedErrors.BadRequest({
        message: 'The user is already active',
      });
    }

    if (auth_user_id === userById.id) {
      throw new sharedErrors.BadRequest({
        message: 'A user cannot activate to itself',
      });
    }

    const changedRows = await userRepository.restore(user_id, connection);

    if (changedRows < 1) {
      throw new Error('User was not restored');
    }

    connection.release();

    return user_id;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while restoring user');
    }

    throw err;
  }
};

/**
 * @param {object} userCredentials The user credentials to change
 */
const changePassword = async ({ user_id, auth_user_id, current_password, new_password }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new userErrors.UserNotFoundError();
    }

    if (auth_user_id !== userById.id) {
      throw new sharedErrors.BadRequest({
        message: 'Cannot update someone else password account',
      });
    }

    const passwordMatchResult = await bcrypt.compare(current_password, userById.password);

    if (!passwordMatchResult) {
      throw new sharedErrors.BadRequest({
        message: 'Invalid credentials. Please try again',
      });
    }

    const hashPassword = await bcrypt.hashPassword(new_password);

    const changedRows = await userRepository.update(
      { password: hashPassword },
      user_id,
      connection
    );

    if (changedRows < 1) {
      throw new Error('User password was not changed');
    }

    connection.release();

    return;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while changing user password');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  find,
  remove,
  restore,
  changePassword,
};
