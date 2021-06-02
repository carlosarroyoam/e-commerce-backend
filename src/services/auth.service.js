const { UserRepository } = require('../dal/repositories');

class AuthService {
  constructor({
    dbConnection, exceptions, bcrypt, jsonwebtoken, logger, config,
  }) {
    this._dbConnection = dbConnection.pool;
    this._exceptions = exceptions;
    this._bcrypt = bcrypt;
    this._jsonwebtoken = jsonwebtoken;
    this._logger = logger.instance;
    this._config = config;
  }

  async login({ email, password }) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const userRepository = new UserRepository(connection);

      const userByEmail = await userRepository.findByEmailForLogin(email);
      if (!userByEmail) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'user' });
      }

      const passwordMatchs = await this._bcrypt.compare(password, userByEmail.password);
      if (!passwordMatchs) {
        throw new Error('Unauthorized');
      }

      const jwt = this._jsonwebtoken.sign({ subcriberId: userByEmail.id });

      connection.release();

      return jwt;
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

module.exports = AuthService;
