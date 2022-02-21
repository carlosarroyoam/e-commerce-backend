const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const userRepository = require('./user.repository');
const sharedErrors = require('../../shared/errors');
const bcrypt = require('../../shared/lib/bcrypt');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.status The user status to query.
 * @param {string} queryOptions.search The search criteria.
 * @return {Promise} The list of users.
 */
const findAll = async ({ skip, limit, sort, status, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const users = await userRepository.findAll({ skip, limit, sort, status, search }, connection);

    connection.release();

    return users;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while retrieving users');
    }

    throw err;
  }
};

/**
 * Retrieves a user by its id.
 *
 * @param {number} user_id The id of the user to retrieve.
 * @return {Promise} The user.
 */
const findById = async (user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError({ email: undefined });
    }

    connection.release();

    return userById;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while retrieving user');
    }

    throw err;
  }
};

/**
 * Deletes a user by its id.
 *
 * @param {number} user_id The id of the user to delete.
 * @param {object} auth_user_id The id of the authenticated user.
 * @return {Promise} The id of the deleted user.
 */
const deleteById = async (user_id, auth_user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError({ email: undefined });
    }

    if (userById.deleted_at !== null) {
      throw new sharedErrors.BadRequestError({
        message: 'The user is already inactive',
      });
    }

    if (auth_user_id === userById.id) {
      throw new sharedErrors.BadRequestError({
        message: 'A user cannot deactivate to itself',
      });
    }

    await userRepository.deleteById(user_id, connection);

    connection.release();

    return user_id;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while deleting user');
    }

    throw err;
  }
};

/**
 * Restores a user by its id.
 *
 * @param {number} user_id The id of the user to restore.
 * @param {object} auth_user_id The id of the authenticated user.
 * @return {Promise} The id of the restored user.
 */
const restore = async (user_id, auth_user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError({ email: undefined });
    }

    if (userById.deleted_at === null) {
      throw new sharedErrors.BadRequestError({
        message: 'The user is already active',
      });
    }

    if (auth_user_id === userById.id) {
      throw new sharedErrors.BadRequestError({
        message: 'A user cannot activate to itself',
      });
    }

    await userRepository.restore(user_id, connection);

    connection.release();

    return user_id;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while restoring user');
    }

    throw err;
  }
};

/**
 * Changes a user's password.
 *
 * @param {object} user The id of the user to restore.
 * @param {number} user.user_id The id of the user to restore.
 * @param {string} user.current_password The current password of the user.
 * @param {string} user.new_password The new password of the user.
 * @param {object} auth_user_id The id of the authenticated user.
 * @return {Promise} The id of the restored user.
 */
const changePassword = async ({ user_id, current_password, new_password }, auth_user_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError({ email: undefined });
    }

    if (auth_user_id !== userById.id) {
      throw new sharedErrors.UnauthorizedError({
        message: `User doesn't have permission to perform this action`,
        email: undefined,
      });
    }

    const passwordMatchResult = await bcrypt.compare(current_password, userById.password);

    if (!passwordMatchResult) {
      throw new sharedErrors.BadRequestError({
        message: 'Invalid credentials. Please try again',
      });
    }

    const hashPassword = await bcrypt.hashPassword(new_password);

    await userRepository.update({ password: hashPassword }, user_id, connection);

    connection.release();

    return;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while changing user password');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  deleteById,
  restore,
  changePassword,
};
