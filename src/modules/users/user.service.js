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
   * @param {object} data The query options
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
   * @param {number} user_id The user_id to find
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
   * @param {number} user_id The user_id to delete
   * @param {number} auth_user_id The user_id who make the request
   */
  async delete(user_id, auth_user_id) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const userById = await this.userRepository.findById(user_id, connection);

      if (!userById) {
        throw new this.sharedErrors.BadRequest({
          message: 'The user is already inactive',
        });
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
   * @param {number} user_id The user_id to restore
   */
  async restore(user_id) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();

      const userById = await this.userRepository.findTrashedById(user_id, connection);

      if (!userById) {
        throw new this.sharedErrors.BadRequest({
          message: 'The user is already active',
        });
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
   * @param {object} userCredentials The user credentials to change
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
