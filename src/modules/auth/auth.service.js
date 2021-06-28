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
    dbConnectionPool, authRepository, authErrors, bcrypt, jsonwebtoken, logger,
  }) {
    this.dbConnectionPool = dbConnectionPool;
    this.authRepository = authRepository;
    this.authErrors = authErrors;
    this.bcrypt = bcrypt;
    this.jsonwebtoken = jsonwebtoken;
    this.logger = logger;
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

      const userByEmail = await this.authRepository.findByEmail(email, connection);
      if (!userByEmail) {
        throw new this.authErrors.UserNotFoundError({ email });
      }

      connection.release();

      const passwordMatches = await this.bcrypt.compare(password, userByEmail.password);
      if (!passwordMatches) {
        throw new this.authErrors.UnauthorizedError({ email });
      }

      const jwt = await this.jsonwebtoken.sign({ subject: userByEmail.id });

      return {
        user_id: userByEmail.id,
        access_token: jwt,
      };
    } catch (err) {
      if (connection) connection.release();

      if (err.sqlMessage) {
        this.logger.log({
          level: 'error',
          message: err.message,
        });

        throw new Error('Error while authenticating');
      }

      throw err;
    }
  }
}

module.exports = AuthService;
