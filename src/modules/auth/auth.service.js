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
        dbConnectionPool,
        authRepository,
        authErrors,
        bcrypt,
        jsonwebtoken,
        logger,
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
     * @return {Promise} The user access token
     */
    async login({ email, password }) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const userByEmail = await this.authRepository.findByEmail(
                email,
                connection
            );

            connection.release();

            if (!userByEmail) {
                throw new this.authErrors.UserNotFoundError({ email });
            }

            const passwordMatches = await this.bcrypt.compare(
                password,
                userByEmail.password
            );
            if (!passwordMatches) {
                throw new this.authErrors.UnauthorizedError({ email });
            }

            const jwt = await this.jsonwebtoken.sign({
                subject: userByEmail.id,
                userRole: userByEmail.user_role,
            });

            return {
                user_id: userByEmail.id,
                user_role_id: userByEmail.user_role_id,
                user_role: userByEmail.user_role,
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
