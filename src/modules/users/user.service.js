/**
 * User service class.
 */
class UserService {
    /**
     * Constructor for UserService.
     *
     * @param {*} dependencies The dependencies payload
     */
    constructor({ dbConnectionPool, userRepository, userErrors, bcrypt, logger }) {
        this.dbConnectionPool = dbConnectionPool;
        this.userRepository = userRepository;
        this.userErrors = userErrors;
        this.bcrypt = bcrypt;
        this.logger = logger;
    }

    /**
     * @param {number} skip
     */
    async findAll(skip) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const users = await this.userRepository.findAll({ skip }, connection);

            connection.release();

            return users;
        } catch (err) {
            if (connection) connection.release();

            if (err.sqlMessage) {
                this.logger.log({
                    level: 'error',
                    message: err.message,
                });

                throw new Error('Error while retrieving users');
            }

            throw err;
        }
    }

    /**
     * @param {number} userId
     */
    async find(userId) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const user = await this.userRepository.findById(userId, connection);

            if (!user) {
                throw new this.userErrors.UserNotFoundError();
            }

            connection.release();

            return user;
        } catch (err) {
            if (connection) connection.release();
            console.log(err);
            if (err.sqlMessage) {
                this.logger.log({
                    level: 'error',
                    message: err.message,
                });

                throw new Error('Error while retrieving user');
            }

            throw err;
        }
    }

    /**
     * @param {object} user
     */
    async store(user) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const userByEmail = await this.userRepository.findByEmail(user.email, connection);

            if (userByEmail) {
                throw new this.userErrors.EmailAlreadyTakenError({
                    email: user.email,
                });
            }

            const passwordHash = await this.bcrypt.hashPassword(user.password);

            const createdUserId = await this.userRepository.store(
                {
                    password: passwordHash,
                    ...user,
                },
                connection
            );

            const createdUser = await this.userRepository.findById(createdUserId, connection);

            connection.release();

            return createdUser;
        } catch (err) {
            if (connection) connection.release();

            if (err.sqlMessage) {
                this.logger.log({
                    level: 'error',
                    message: err.message,
                });

                throw new Error('Error while storing user');
            }

            throw err;
        }
    }

    /**
     * @param {number} userId
     * @param {object} user
     */
    async update(userId, user) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const userById = await this.userRepository.findById(userId, connection);

            if (!userById) {
                throw new this.userErrors.UserNotFoundError();
            }

            let password;
            if (user.password) {
                password = await this.bcrypt.hashPassword(user.password);
            }

            const affectedRows = await this.userRepository.update(
                userId,
                {
                    password,
                    ...user,
                },
                connection
            );

            if (affectedRows < 1) {
                throw new Error('User was not updated');
            }

            const updatedUser = await this.userRepository.findById(userId, connection);

            connection.release();

            return updatedUser;
        } catch (err) {
            if (connection) connection.release();

            if (err.sqlMessage) {
                this.logger.log({
                    level: 'error',
                    message: err.message,
                });

                throw new Error('Error while updating user');
            }

            throw err;
        }
    }

    /**
     * @param {number} userId
     */
    async delete(userId) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const userById = await this.userRepository.findById(userId, connection);

            if (!userById) {
                throw new this.userErrors.UserNotFoundError();
            }

            const affectedRows = await this.userRepository.delete(userId, connection);

            if (affectedRows < 1) {
                throw new Error('User was not deleted');
            }

            connection.release();

            return userId;
        } catch (err) {
            if (connection) connection.release();

            if (err.sqlMessage) {
                this.logger.log({
                    level: 'error',
                    message: err.message,
                });

                throw new Error('Error while deleting user');
            }

            throw err;
        }
    }

    /**
     * @param {number} userId
     */
    async restore(userId) {
        let connection;

        try {
            connection = await this.dbConnectionPool.getConnection();

            const userById = await this.userRepository.findTrashedById(userId, connection);

            if (!userById) {
                throw new this.userErrors.UserNotFoundError();
            }

            const affectedRows = await this.userRepository.restore(userId, connection);

            if (affectedRows < 1) {
                throw new Error('User was not restored');
            }

            connection.release();

            return userId;
        } catch (err) {
            if (connection) connection.release();

            if (err.sqlMessage) {
                this.logger.log({
                    level: 'error',
                    message: err.message,
                });

                throw new Error('Error while restoring user');
            }

            throw err;
        }
    }
}

module.exports = UserService;
