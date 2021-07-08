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
 * Performs the SQL query to store a personal_access_token.
 *
 * @param {any} personal_access_token The personal_access_token data
 * @param {any} connection The database connection
 * @return {Promise} The query result
 */
async function storePersonalAccessToken(personal_access_token, connection) {
    const query = `INSERT INTO personal_access_tokens SET ?`;

    return connection.query(query, [personal_access_token]);
}

module.exports = {
    getById,
    getByEmail,
    storePersonalAccessToken
};
