const dbConnectionPool = require('../../common/lib/mysql/connectionPool');
const AdminRepository = require('./admin.repository');
const UserRepository = require('../../modules/users/user.repository');
const sharedErrors = require('../../common/errors');
const userRoles = require('../../modules/auth/roles');
const bcrypt = require('../../common/lib/bcrypt');
const logger = require('../../common/lib/winston/logger');

/**
 * AdminService class.
 */
class AdminService {
  /**
   * Retrieves all admin users.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.skip The query skip.
   * @param {number} queryOptions.limit The query limit.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.status The user status to query.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The list of admins.
   */
  async findAll({ skip, limit, sort, status, search }) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const adminRepository = new AdminRepository(connection);

      const admins = await adminRepository.findAll({ skip, limit, sort, status, search });

      connection.release();

      return admins;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while retrieving admins');
      }

      throw err;
    }
  }

  /**
   * Retrieves a admin user by its id.
   *
   * @param {object} admin The admin user object.
   * @param {number} admin.admin_id The id of the admin user to retrieve.
   * @return {Promise} The admin user.
   */
  async findById({ admin_id }) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const adminRepository = new AdminRepository(connection);

      const adminById = await adminRepository.findById(admin_id);

      if (!adminById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      connection.release();

      return adminById;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while retrieving admin');
      }

      throw err;
    }
  }

  /**
   * Stores a admin user.
   *
   * @param {object} admin The admin user to store.
   * @return {Promise} The created admin user.
   */
  async store(admin) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const userByEmail = await userRepository.findByEmail(admin.email);

      if (userByEmail) {
        throw new sharedErrors.EmailAlreadyTakenError({
          email: admin.email,
        });
      }

      const passwordHash = await bcrypt.hashPassword(admin.password);

      const createdUserId = await userRepository.store({
        ...admin,
        password: passwordHash,
        user_role_id: userRoles.admin.id,
      });

      const createdAdminId = await adminRepository.store({
        is_super: admin.is_super,
        user_id: createdUserId,
      });

      const createdAdmin = await adminRepository.findById(createdAdminId);

      connection.commit();

      connection.release();

      return createdAdmin;
    } catch (err) {
      if (connection) {
        connection.rollback();

        connection.release();
      }

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while storing admin');
      }

      throw err;
    }
  }

  /**
   * Updates a admin user by its id.
   *
   * @param {number} admin_id The id of the admin user to update.
   * @param {object} admin The admin user to store.
   * @return {Promise} The updated admin user.
   */
  async update(admin_id, admin) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const adminById = await adminRepository.findById(admin_id);

      if (!adminById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      if (adminById.deleted_at !== null) {
        throw new sharedErrors.BadRequestError('The user account is disabled');
      }

      await userRepository.update(
        {
          ...admin,
        },
        adminById.user_id
      );

      const updatedAdmin = await adminRepository.findById(admin_id);

      connection.commit();

      connection.release();

      return updatedAdmin;
    } catch (err) {
      if (connection) {
        connection.rollback();

        connection.release();
      }

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while updating admin');
      }

      throw err;
    }
  }
}

module.exports = new AdminService();
