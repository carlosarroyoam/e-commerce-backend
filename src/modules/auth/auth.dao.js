/**
 * Performs the SQL query to get a non-deleted/active user by its id address.
 *
 * @param {any} id The user id to query
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getById(id, connection) {
    const query = `SELECT usr.id, email, usrrl.type AS user_role
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE usr.id = ? AND usr.deleted_at IS NULL`;

    return connection.query(query, [id]);
}

/**
 * Performs the SQL query to get a non-deleted/active user by its email address.
 *
 * @param {any} email The user email to query
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getByEmail(email, connection) {
    const query = `SELECT usr.id, email, password, usrrl.id AS user_role_id, usrrl.type AS user_role
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE usr.email = ? AND usr.deleted_at IS NULL`;

    return connection.query(query, [email]);
}

/**
 * Performs the SQL query to get a personal access token.
 *
 * @param {number} userId The user id
 * @param {string} personalAccessToken The token
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getPersonalAccessToken(userId, personalAccessToken, connection) {
    const query = `SELECT id, finger_print FROM personal_access_tokens
        WHERE user_id = ? AND token = ?`;

    return connection.query(query, [userId, personalAccessToken]);
}

/**
 * Performs the SQL query to get all expired personal access token.
 *
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getExpiredPersonalAccessTokens(connection) {
    const query = `SELECT id FROM personal_access_tokens WHERE now() > created_at + INTERVAL 1 hour`;

    return connection.query(query);
}

/**
 * Performs the SQL query to get a personal access token by finger print.
 *
 * @param {number} userId The user id
 * @param {string} fingerPrint The token finger print
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function getPersonalAccessTokenByFingerPrint(userId, fingerPrint, connection) {
    const query = `SELECT id FROM personal_access_tokens
        WHERE user_id = ? AND finger_print = ?`;

    return connection.query(query, [userId, fingerPrint]);
}

/**
 * Performs the SQL query to store a personal access token.
 *
 * @param {any} personalAccessToken The personal access token data
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function storePersonalAccessToken(personalAccessToken, connection) {
    const query = `INSERT INTO personal_access_tokens SET ?`;

    return connection.query(query, [personalAccessToken]);
}

/**
 * Performs the SQL query to update a personal access token.
 *
 * @param {any} personalAccessToken The personal access token data
 * @param {number} personalAccessTokenId The personal access token id
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function updatePersonalAccessToken(personalAccessToken, personalAccessTokenId, connection) {
    const query = `UPDATE personal_access_tokens SET ? WHERE id = ?`;

    return connection.query(query, [personalAccessToken, personalAccessTokenId]);
}

module.exports = {
    getById,
    getByEmail,
    getPersonalAccessToken,
    getExpiredPersonalAccessTokens,
    getPersonalAccessTokenByFingerPrint,
    storePersonalAccessToken,
    updatePersonalAccessToken
};
