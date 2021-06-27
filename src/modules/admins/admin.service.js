const AdminRepository = require('./admin.repository');
const UserRepository = require('../users/user.repository');

/**
 * Admin service class.
 */
class AdminService {
  /**
   * Constructor for AdminService.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({
    dbConnectionPool, userRepository, adminErrors, bcrypt,
  }) {
    this.dbConnectionPool = dbConnectionPool;
    this.userRepository = userRepository;
    this._adminErrors = adminErrors;
    this._bcrypt = bcrypt;
  }

  /**
   *
   */
  async findAll() {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const adminRepository = new AdminRepository(connection);

      const admins = await adminRepository.findAll();

      connection.release();

      return admins;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while retrieving admins');
      }

      throw err;
    }
  }

  /**
   * @param {number} adminId
   */
  async find(adminId) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const adminRepository = new AdminRepository(connection);

      const admin = await adminRepository.findById(adminId);
      if (!admin) {
        throw new this._adminErrors.UserNotFoundError();
      }

      connection.release();

      return admin;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while retrieving admin');
      }

      throw err;
    }
  }

  /**
   * @param {object} admin
   */
  async store(admin) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const userByEmail = await this.userRepository.findByEmailWithTrashed(admin.email, connection);
      if (userByEmail) {
        throw new this._adminErrors.EmailAlreadyTakenError({ email: admin.email });
      }

      const passwordHash = await this._bcrypt.hashPassword(admin.password);

      const createdAdminId = await adminRepository.store({ isSuper: admin.isSuper });

      await this.userRepository.store({
        ...admin, password: passwordHash, userableType: 'App/Admin', userableId: createdAdminId,
      }, connection);

      const createdAdmin = await adminRepository.findById(createdAdminId);

      connection.commit();
      connection.release();

      return createdAdmin;
    } catch (err) {
      connection.rollback();
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while storing admin');
      }

      throw err;
    }
  }

  /**
   * @param {number} adminId
   * @param {object} admin
   */
  async update(adminId, admin) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const adminById = await adminRepository.findById(adminId);
      if (!adminById) {
        throw new this._adminErrors.UserNotFoundError();
      }

      let password;
      if (admin.password) {
        password = await this._bcrypt.hashPassword(admin.password);
      }

      const adminAffectedRows = await adminRepository.update(adminId, { isSuper: admin.isSuper });

      const userAffectedRows = await this.userRepository.update(adminById.id, { ...admin, password }, connection);

      if (adminAffectedRows < 1 || userAffectedRows < 1) {
        throw new Error('Admin was not updated');
      }

      const updatedAdmin = await adminRepository.findById(adminId);

      connection.commit();
      connection.release();

      return updatedAdmin;
    } catch (err) {
      connection.rollback();
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while updating admin');
      }

      throw err;
    }
  }
}

module.exports = AdminService;
