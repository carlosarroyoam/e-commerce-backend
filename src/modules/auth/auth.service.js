const AuthRepository = require('./auth.repository');

class AuthService {
  constructor({
    dbConnection, authErrors, bcrypt, jsonwebtoken,
  }) {
    this.dbConnection = dbConnection;
    this.authErrors = authErrors;
    this.bcrypt = bcrypt;
    this.jsonwebtoken = jsonwebtoken;
  }

  async login({ email, password }) {
    let connection;

    try {
      connection = await this.dbConnection.getConnection();
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
