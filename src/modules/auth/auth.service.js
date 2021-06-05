const AuthRepository = require('./repositories/auth.repository');

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
      const authRepository = new AuthRepository(connection);

      const userByEmail = await authRepository.findByEmail(email);
      if (!userByEmail) {
        throw new this._exceptions.ResourceNotFoundError({ resourceName: 'user' });
      }

      const passwordMatches = await this._bcrypt.compare(password, userByEmail.password);
      if (!passwordMatches) {
        throw new this._exceptions.UnauthorizedError({ email });
      }

      const jwt = this._jsonwebtoken.sign({ subscriberId: userByEmail.id });

      connection.release();

      return { accessToken: jwt };
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
