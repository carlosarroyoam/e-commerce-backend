const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const adminRepository = require('./admin.repository');
const userRepository = require('../../modules/users/user.repository');
const sharedErrors = require('../../shared/errors');
const userRoles = require('../../modules/auth/roles');
const bcrypt = require('../../shared/lib/bcrypt');
const logger = require('../../shared/lib/winston/logger');

/**
 *
 */
const findAll = async ({ skip, limit, sort, status, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const admins = await adminRepository.findAll(
      { skip, limit, order_by: sort, user_status: status, search },
      connection
    );

    connection.release();

    return admins;
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
 * @param {number} admin_id
 */
const find = async (admin_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const adminById = await adminRepository.findById(admin_id, connection);

    if (!adminById) {
      throw new sharedErrors.UserNotFoundError();
    }

    connection.release();

    return adminById;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving admin');
    }

    throw err;
  }
};

/**
 * @param {object} admin
 */
const store = async (admin) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    connection.beginTransaction();

    const userByEmail = await userRepository.findByEmail(admin.email, connection);

    if (userByEmail) {
      throw new sharedErrors.EmailAlreadyTakenError({
        email: admin.email,
      });
    }

    const passwordHash = await bcrypt.hashPassword(admin.password);

    const createdUserId = await userRepository.store(
      {
        ...admin,
        password: passwordHash,
        user_role_id: userRoles.admin.id,
      },
      connection
    );

    const createdAdmin_id = await adminRepository.store(
      {
        is_super: admin.is_super,
        user_id: createdUserId,
      },
      connection
    );

    const createdAdmin = await adminRepository.findById(createdAdmin_id, connection);

    connection.commit();

    connection.release();

    return createdAdmin;
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

      throw new Error('Error while storing admin');
    }

    throw err;
  }
};

/**
 * @param {number} admin_id
 * @param {object} admin
 */
const update = async (admin_id, admin) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    connection.beginTransaction();

    const adminById = await adminRepository.findById(admin_id, connection);

    if (!adminById) {
      throw new sharedErrors.UserNotFoundError();
    }

    if (adminById.deleted_at !== null) {
      throw new sharedErrors.BadRequest({
        message: 'The user account is disabled',
      });
    }

    await userRepository.update(
      {
        ...admin,
      },
      adminById.user_id,
      connection
    );

    const updatedAdmin = await adminRepository.findById(admin_id, connection);

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
  find,
  store,
  update,
};
