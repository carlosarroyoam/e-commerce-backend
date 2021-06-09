const UserRepository = require('./repositories/user.repository');

class UserService {
  constructor({
    dbConnection, userErrors, bcrypt,
  }) {
    this._dbConnection = dbConnection.pool;
    this._userErrors = userErrors;
    this._bcrypt = bcrypt;
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
      const userRepository = new UserRepository(connection);

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new this._userErrors.UserNotFoundError();
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

  async store(user) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const userByEmail = await userRepository.findByEmail(user.email);
      if (userByEmail) {
        throw new this._userErrors.EmailAlreadyTakenError({ email: user.email });
      }

      const passwordHash = await this._bcrypt.hashPassword(user.password);

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

  async update(userId, user) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const userById = await userRepository.findById(userId);
      if (!userById) {
        throw new this._userErrors.UserNotFoundError();
      }

      let password;
      if (user.password) {
        password = await this._bcrypt.hashPassword(user.password);
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

  async delete(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const userById = await userRepository.findById(userId);
      if (!userById) {
        throw new this._userErrors.UserNotFoundError();
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

  async restore(userId) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const userById = await userRepository.findTrashedById(userId);
      if (!userById) {
        throw new this._userErrors.UserNotFoundError();
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
