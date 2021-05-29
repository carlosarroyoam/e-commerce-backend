const { UserRepository } = require('../dal/repositories');

class UserService {
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
      const userRepository = new UserRepository(connection);

      const users = await userRepository.findAll();

      connection.release();

      return users;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      throw err;
    }
  }

  async find(id) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const user = await userRepository.findById(id);
      if (!user) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'user' });
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

      throw err;
    }
  }

  async store(userDto) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const emailIsUsed = await userRepository.findByEmail(userDto.email);
      if (emailIsUsed) {
        throw new this._exceptions.EmailAlreadyTakenError({ email: userDto.email });
      }

      const passwordHash = await this._bcrypt.hashPassword(userDto.password);

      const createdUserId = await userRepository.store({ ...userDto, password: passwordHash });

      const createdUser = await userRepository.findById(createdUserId);

      connection.release();

      return createdUser;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      throw err;
    }
  }

  async update(userId, userDto) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'user' });
      }

      let password;
      if (userDto.password) {
        password = await this._bcrypt.hashPassword(userDto.password);
      }

      const affectedRows = await userRepository.update(userId, { ...userDto, password });
      if (affectedRows < 1) {
        throw new Error('User was not updated');
      }

      const updatedUser = await userRepository.findById(userId);

      connection.release();

      return updatedUser;
    } catch (err) {
      connection.release();

      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      throw err;
    }
  }

  async delete(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'user' });
      }

      const affectedRows = await userRepository.delete(userId);
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

      throw err;
    }
  }

  async restore(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);
      const affectedRows = await userRepository.restore(userId);
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

      throw err;
    }
  }
}

module.exports = UserService;
