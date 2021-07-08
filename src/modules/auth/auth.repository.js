/**
 * Auth repository class.
 */
class AuthRepository {
    /**
     * Constructor for AuthRepository.
     *
     * @param {*} dependencies The dependencies payload
     */
    constructor({ authDao }) {
        this.authDao = authDao;
    }

    /**
     * Retrieves a non-deleted/active user by its email address.
     * 
     * @param {string} email The user email to query
     * @param {any} connection The database connection
     * @return {Promise} The query result
     */
    async findByEmail(email, connection) {
        const [result] = await this.authDao.getByEmail(email, connection);

        return result[0];
    }

    /**
     * Retrieves a non-deleted/active user by its id.
     *
     * @param {number} id The user id to query
     * @param {any} connection The database connection
     * @return {Promise} The result of the query
     */
    async findById(id, connection) {
        const [result] = await this.authDao.getById(id, connection);

        return result[0];
    }


    /**
     * Get a personal access token by its id.
     * 
     * @param {string} personalAccessTokenId The personal access token id
     * @param {any} connection The database connection
     * @return {Promise} The query result
     */
    async getpersonalAccessTokenById(personalAccessTokenId, connection) {
        const [result] = await this.authDao.getpersonalAccessTokenById(personalAccessTokenId, connection);

        return result.insertId;
    }

    /**
     * Stores a personal access token.
     * 
     * @param {string} personalAccessToken The personal access token data
     * @param {any} connection The database connection
     * @return {Promise} The query result
     */
    async storePersonalAccessToken(personalAccessToken, connection) {
        const [result] = await this.authDao.storePersonalAccessToken(personalAccessToken, connection);

        return result.insertId;
    }
}

module.exports = AuthRepository;
