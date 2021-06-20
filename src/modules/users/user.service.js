const UserRepository = require('./user.repository');

/**
 * User service class.
 */
class UserService {
  /**
   * Constructor for UserService.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({
    dbConnectionPool, userErrors, bcrypt,
  }) {
    this.dbConnectionPool = dbConnectionPool;
    this.userErrors = userErrors;
    this.bcrypt = bcrypt;
  }

  /**
   *
   */
  async findAll() {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);

      const users = await userRepository.findAll();

      connection.release();

      return users;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while retrieving users');
      }

      throw err;
    }
  }

  /**
   * @param {number} userId
   */
  async find(userId) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new this.userErrors.UserNotFoundError();
      }

      connection.release();

      return user;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while retrieving user');
      }

      throw err;
    }
  }

  /**
   * @param {object} user
   */
  async store(user) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);

      const userByEmail = await userRepository.findByEmail(user.email);
      if (userByEmail) {
        throw new this.userErrors.EmailAlreadyTakenError({ email: user.email });
      }

      const passwordHash = await this.bcrypt.hashPassword(user.password);

      const createdUserId = await userRepository.store({ ...user, password: passwordHash });

      const createdUser = await userRepository.findById(createdUserId);

      connection.release();

      return createdUser;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while storing user');
      }

      throw err;
    }
  }

  /**
   * @param {number} userId
   * @param {object} user
   */
  async update(userId, user) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);

      const userById = await userRepository.findById(userId);
      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      let password;
      if (user.password) {
        password = await this.bcrypt.hashPassword(user.password);
      }

      const affectedRows = await userRepository.update(userId, { ...user, password });
      if (affectedRows < 1) {
        throw new Error('User was not updated');
      }

      const updatedUser = await userRepository.findById(userId);

      connection.release();

      return updatedUser;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while updating user');
      }

      throw err;
    }
  }

  /**
   * @param {number} userId
   */
  async delete(userId) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);

      const userById = await userRepository.findById(userId);
      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      const affectedRows = await userRepository.delete(userId);
      if (affectedRows < 1) {
        throw new Error('User was not deleted');
      }

      connection.release();

      return userId;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while deleting user');
      }

      throw err;
    }
  }

  /**
   * @param {number} userId
   */
  async restore(userId) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const userRepository = new UserRepository(connection);

      const userById = await userRepository.findTrashedById(userId);
      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      const affectedRows = await userRepository.restore(userId);
      if (affectedRows < 1) {
        throw new Error('User was not restored');
      }

      connection.release();

      return userId;
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while restoring user');
      }

      throw err;
    }
  }
}

module.exports = UserService;
