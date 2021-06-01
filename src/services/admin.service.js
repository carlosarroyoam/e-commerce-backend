const { AdminRepository, UserRepository } = require('../dal/repositories');

class AdminService {
  constructor({
    dbConnection, exceptions, bcrypt, logger,
  }) {
    this._dbConnection = dbConnection.pool;
    this._exceptions = exceptions;
    this._bcrypt = bcrypt;
    this._logger = logger.instance;
  }

  async findAll() {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const adminRepository = new AdminRepository(connection);

      const users = await adminRepository.findAll();

      connection.release();

      return users;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      if (err.sqlMessage) {
        throw new Error('Error while retrieving users');
      }

      throw err;
    }
  }

  async find(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const adminRepository = new AdminRepository(connection);

      const user = await adminRepository.findById(userId);
      if (!user) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'admin' });
      }

      connection.release();

      return user;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      if (err.sqlMessage) {
        throw new Error('Error while retrieving user');
      }

      throw err;
    }
  }

  async store(user) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const userByEmail = await userRepository.findByEmailWithTrashed(user.email);
      if (userByEmail) {
        throw new this._exceptions.EmailAlreadyTakenError({ email: user.email });
      }

      const passwordHash = await this._bcrypt.hashPassword(user.password);

      const createdAdminId = await adminRepository.store({ isSuper: user.isSuper });

      await userRepository.store({
        ...user, password: passwordHash, userableType: 'App/Admin', userableId: createdAdminId,
      });

      const createdAdmin = await adminRepository.findById(createdAdminId);

      connection.commit();
      connection.release();

      return createdAdmin;
    } catch (err) {
      connection.rollback();
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      if (err.sqlMessage) {
        throw new Error('Error while storing admin');
      }

      throw err;
    }
  }

  async update(userId, user) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);
      const adminRepository = new AdminRepository(connection);

      connection.beginTransaction();

      const adminById = await adminRepository.findById(userId);
      if (!adminById) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'admin' });
      }

      let password;
      if (user.password) {
        password = await this._bcrypt.hashPassword(user.password);
      }

      const adminAffectedRows = await adminRepository.update(userId, { isSuper: user.isSuper });

      const userAffectedRows = await userRepository.update(adminById.id, { ...user, password });

      if (adminAffectedRows < 1 || userAffectedRows < 1) {
        throw new Error('Admin was not updated');
      }

      const updatedAdmin = await adminRepository.findById(userId);

      connection.commit();
      connection.release();

      return updatedAdmin;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      if (err.sqlMessage) {
        throw new Error('Error while updating user');
      }

      throw err;
    }
  }

  async delete(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const adminRepository = new AdminRepository(connection);

      const userById = await adminRepository.findById(userId);
      if (!userById) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'admin' });
      }

      const affectedRows = await adminRepository.delete(userId);
      if (affectedRows < 1) {
        throw new Error('User was not deleted');
      }

      connection.release();

      return userId;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      if (err.sqlMessage) {
        throw new Error('Error while deleting user');
      }

      throw err;
    }
  }

  async restore(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const adminRepository = new AdminRepository(connection);

      const userById = await adminRepository.findTrashedById(userId);
      if (!userById) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'admin' });
      }

      const affectedRows = await adminRepository.restore(userId);
      if (affectedRows < 1) {
        throw new Error('User was not restored');
      }

      connection.release();

      return userId;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      if (err.sqlMessage) {
        throw new Error('Error while restoring user');
      }

      throw err;
    }
  }
}

module.exports = AdminService;
