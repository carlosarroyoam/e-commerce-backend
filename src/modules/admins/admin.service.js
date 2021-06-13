const AdminRepository = require('./admin.repository');
const UserRepository = require('../users/user.repository');

class AdminService {
  constructor({
    dbConnection, adminErrors, bcrypt,
  }) {
    this._dbConnection = dbConnection;
    this._adminErrors = adminErrors;
    this._bcrypt = bcrypt;
  }

  async findAll() {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
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

  async find(adminId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
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

  async store(admin) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const userByEmail = await userRepository.findByEmailWithTrashed(admin.email);
      if (userByEmail) {
        throw new this._adminErrors.EmailAlreadyTakenError({ email: admin.email });
      }

      const passwordHash = await this._bcrypt.hashPassword(admin.password);

      const createdAdminId = await adminRepository.store({ isSuper: admin.isSuper });

      await userRepository.store({
        ...admin, password: passwordHash, userableType: 'App/Admin', userableId: createdAdminId,
      });

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

  async update(adminId, admin) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);
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

      const userAffectedRows = await userRepository.update(adminById.id, { ...admin, password });

      if (adminAffectedRows < 1 || userAffectedRows < 1) {
        throw new Error('Admin was not updated');
      }

      const updatedAdmin = await adminRepository.findById(adminId);

      connection.commit();
      connection.release();

      return updatedAdmin;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while updating admin');
      }

      throw err;
    }
  }

  async delete(adminId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const adminRepository = new AdminRepository(connection);

      const adminById = await adminRepository.findById(adminId);
      if (!adminById) {
        throw new this._adminErrors.UserNotFoundError();
      }

      const affectedRows = await adminRepository.delete(adminId);
      if (affectedRows < 1) {
        throw new Error('User was not deleted');
      }

      connection.release();

      return adminId;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while deleting admin');
      }

      throw err;
    }
  }

  async restore(adminId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const adminRepository = new AdminRepository(connection);

      const adminById = await adminRepository.findTrashedById(adminId);
      if (!adminById) {
        throw new this._adminErrors.UserNotFoundError();
      }

      const affectedRows = await adminRepository.restore(adminId);
      if (affectedRows < 1) {
        throw new Error('Admin was not restored');
      }

      connection.release();

      return adminId;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while restoring admin');
      }

      throw err;
    }
  }
}

module.exports = AdminService;
