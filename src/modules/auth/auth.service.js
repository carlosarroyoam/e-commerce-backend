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
    async login({ email, password, finger_print, user_agent }) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const userByEmail = await this.authRepository.findByEmail(
                email,
                connection
            );

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

            const token = await this.jsonwebtoken.sign({
                subject: userByEmail.id,
                userRole: userByEmail.user_role,
            });

            const refreshToken = await this.jsonwebtoken.signRefresh({
                subject: userByEmail.id,
            });

            const personalAccessTokenByFingerPrint = await this.authRepository.getPersonalAccessTokenByFingerPrint(
                userByEmail.id,
                finger_print,
                connection
            );

            if (personalAccessTokenByFingerPrint) {
                const updatePersonalAccessTokenAffectedRows = await this.authRepository.updatePersonalAccessToken({
                    token: refreshToken
                }, personalAccessTokenByFingerPrint.id, connection);

                if (updatePersonalAccessTokenAffectedRows < 1) {
                    throw new Error('Error while updating refresh token');
                }
            } else {
                await this.authRepository.storePersonalAccessToken({
                    token: refreshToken,
                    user_id: userByEmail.id,
                    finger_print,
                    user_agent
                }, connection);
            }

            connection.release();

            return {
                user_id: userByEmail.id,
                user_role_id: userByEmail.user_role_id,
                user_role: userByEmail.user_role,
                access_token: token,
                refresh_token: refreshToken
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


    /**
     *
     * @param {*} credentials The refresh token
     * @return {Promise} The user access token
     */
    async refreshToken({ refresh_token, finger_print }) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const decoded = await this.jsonwebtoken.verifyRefresh(refresh_token);

            const userById = await this.authRepository.findById(
                decoded.sub,
                connection
            );

            if (!userById) {
                throw new this.authErrors.UnauthorizedError({ message: 'User is not active' });
            }

            const token = await this.jsonwebtoken.sign({
                subject: userById.id,
                userRole: userById.user_role,
            });

            const currentPersonalAccessToken = await this.authRepository.getPersonalAccessToken(decoded.sub, refresh_token, connection);

            if (!currentPersonalAccessToken) {
                throw new this.authErrors.UnauthorizedError({ message: 'The provided token is not valid' });
            }

            if (currentPersonalAccessToken.finger_print !== finger_print) {
                throw new this.authErrors.UnauthorizedError({ message: 'The provided token is not valid' });
            }

            const updatePersonalAccessTokenAffectedRows = await this.authRepository.updatePersonalAccessToken({
                last_used_at: new Date(),
            }, currentPersonalAccessToken.id, connection);

            if (updatePersonalAccessTokenAffectedRows < 1) {
                throw new Error('Error while refreshing token');
            }

            connection.release();

            return {
                access_token: token,
            };
        } catch (err) {
            if (connection) connection.release();

            if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError' || err.name == 'NotBeforeError') {
                throw new this.authErrors.UnauthorizedError({
                    message:
                        'The provided token is not valid',
                });
            }

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
