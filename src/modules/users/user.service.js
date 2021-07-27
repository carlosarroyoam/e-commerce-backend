/**
 * User service class.
 */
class UserService {
  /**
   * Constructor for UserService.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({ dbConnectionPool, userRepository, userErrors, sharedErrors, bcrypt, logger }) {
    this.dbConnectionPool = dbConnectionPool;
    this.userRepository = userRepository;
    this.userErrors = userErrors;
    this.sharedErrors = sharedErrors;
    this.bcrypt = bcrypt;
    this.logger = logger;
  }

  /**
   * @param {object} data
   */
  async findAll({ skip, sort, status, search }) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const users = await this.userRepository.findAll(
        { skip, orderBy: sort, userStatus: status, search },
        connection
      );

      connection.release();

      return users;
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while retrieving users');
      }

      throw err;
    }
  }

  /**
   * @param {number} user_id
   */
  async find(user_id) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const user = await this.userRepository.findById(user_id, connection);

      if (!user) {
        throw new this.userErrors.UserNotFoundError();
      }

      connection.release();

      return user;
    } catch (err) {
      if (connection) connection.release();
      console.log(err);
      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

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

      const userByEmail = await this.userRepository.findByEmail(user.email, connection);

      if (userByEmail) {
        throw new this.userErrors.EmailAlreadyTakenError({
          email: user.email,
        });
      }

      const passwordHash = await this.bcrypt.hashPassword(user.password);

      const createdUserId = await this.userRepository.store(
        {
          password: passwordHash,
          ...user,
        },
        connection
      );

      const createdUser = await this.userRepository.findById(createdUserId, connection);

      connection.release();

      return createdUser;
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while storing user');
      }

      throw err;
    }
  }

  /**
   * @param {number} user_id
   * @param {object} user
   */
  async update(user_id, user) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const userById = await this.userRepository.findById(user_id, connection);

      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      let password;
      if (user.password) {
        password = await this.bcrypt.hashPassword(user.password);
      }

      const affectedRows = await this.userRepository.update(
        user_id,
        {
          password,
          ...user,
        },
        connection
      );

      if (affectedRows < 1) {
        throw new Error('User was not updated');
      }

      const updatedUser = await this.userRepository.findById(user_id, connection);

      connection.release();

      return updatedUser;
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while updating user');
      }

      throw err;
    }
  }

  /**
   * @param {number} user_id
   * @param {number} auth_user_id
   */
  async delete(user_id, auth_user_id) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const userById = await this.userRepository.findById(user_id, connection);

      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      if (auth_user_id === userById.id) {
        throw new this.sharedErrors.BadRequest({
          message: 'A user cannot deactivate to itself',
        });
      }

      const affectedRows = await this.userRepository.delete(user_id, connection);

      if (affectedRows < 1) {
        throw new Error('User was not deleted');
      }

      connection.release();

      return user_id;
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while deleting user');
      }

      throw err;
    }
  }

  /**
   * @param {number} user_id
   */
  async restore(user_id) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const userById = await this.userRepository.findTrashedById(user_id, connection);

      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      const affectedRows = await this.userRepository.restore(user_id, connection);

      if (affectedRows < 1) {
        throw new Error('User was not restored');
      }

      connection.release();

      return user_id;
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while restoring user');
      }

      throw err;
    }
  }

  /**
   * @param {object} userCredentials
   */
  async changePassword({ user_id, current_password, new_password }) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const userById = await this.userRepository.findById(user_id, connection);

      if (!userById) {
        throw new this.userErrors.UserNotFoundError();
      }

      const passwordMatchResult = await this.bcrypt.compare(current_password, userById.password);

      if (!passwordMatchResult) {
        throw new this.sharedErrors.BadRequest({
          message: 'Invalid credentials. Please try again',
        });
      }

      const hashPassword = await this.bcrypt.hashPassword(new_password);

      const affectedRows = await this.userRepository.update(
        { password: hashPassword },
        user_id,
        connection
      );

      if (affectedRows < 1) {
        throw new Error('User password was not changed');
      }

      connection.release();

      return;
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while changing user password');
      }

      throw err;
    }
  }
}

module.exports = UserService;
