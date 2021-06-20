const AuthRepository = require('./auth.repository');

/**
 * Auth service class.
 */
class AuthService {
  /**
   * Constructor for AuthService.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({
    dbConnectionPool, authErrors, bcrypt, jsonwebtoken,
  }) {
    this.dbConnectionPool = dbConnectionPool;
    this.authErrors = authErrors;
    this.bcrypt = bcrypt;
    this.jsonwebtoken = jsonwebtoken;
  }

  /**
   *
   * @param {*} credentials The user credentials for the login attempt
   * @returns {Promise} The user access token
   */
  async login({ email, password }) {
    let connection;

    try {
      connection = await this.dbConnectionPool.getConnection();
      const authRepository = new AuthRepository(connection);

      const userByEmail = await authRepository.findByEmail(email);
      if (!userByEmail) {
        throw new this.authErrors.UserNotFoundError({ email });
      }

      const passwordMatches = await this.bcrypt.compare(password, userByEmail.password);
      if (!passwordMatches) {
        throw new this.authErrors.UnauthorizedError({ email });
      }

      const jwt = this.jsonwebtoken.sign({ subject: userByEmail.id });

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
