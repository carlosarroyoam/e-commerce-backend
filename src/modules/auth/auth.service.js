const AuthRepository = require('./repositories/auth.repository');

class AuthService {
  constructor({
    dbConnection, userErrors, bcrypt, jsonwebtoken, config,
  }) {
    this._dbConnection = dbConnection.pool;
    this._userErrors = userErrors;
    this._bcrypt = bcrypt;
    this._jsonwebtoken = jsonwebtoken;
    this._config = config;
  }

  async login({ email, password }) {
    let connection;

    try {
      connection = await this._dbConnection.getConnection();
      const authRepository = new AuthRepository(connection);

      const userByEmail = await authRepository.findByEmail(email);
      if (!userByEmail) {
        throw new this._userErrors.UserNotFoundError();
      }

      const passwordMatches = await this._bcrypt.compare(password, userByEmail.password);
      if (!passwordMatches) {
        throw new this._userErrors.UnauthorizedError({ email });
      }

      const jwt = this._jsonwebtoken.sign({ subscriberId: userByEmail.id });

      connection.release();

      return { accessToken: jwt };
    } catch (err) {
      connection.release();

      throw err;
    }
  }
}

module.exports = AuthService;
