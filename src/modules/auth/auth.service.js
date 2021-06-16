const AuthRepository = require('./auth.repository');

class AuthService {
  constructor({
    dbConnection, authErrors, bcrypt, jsonwebtoken, config,
  }) {
    this._dbConnection = dbConnection;
    this._authErrors = authErrors;
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
        throw new this._authErrors.UserNotFoundError({ email });
      }

      const passwordMatches = await this._bcrypt.compare(password, userByEmail.password);
      if (!passwordMatches) {
        throw new this._authErrors.UnauthorizedError({ email });
      }

      const jwt = this._jsonwebtoken.sign({ subject: userByEmail.id });

      connection.release();

      return {
        user_id: userByEmail.id,
        access_token: jwt,
      };
    } catch (err) {
      connection.release();

      if (err.sqlMessage) {
        throw new Error('Error while authenticating');
      }

      throw err;
    }
  }
}

module.exports = AuthService;
