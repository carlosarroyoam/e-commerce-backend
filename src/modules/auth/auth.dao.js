/**
 * Performs the SQL query to get a non-deleted/active user by its email address.
 *
 * @return {Promise}
 * @param {any} email
 * @param {any} connection
 */
async function getByEmail(email, connection) {
    const query = `SELECT usr.id, email, password, usrrl.id AS user_role_id, usrrl.type AS user_role
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE email = ? AND deleted_at IS NULL`;

    return connection.query(query, [email]);
}

module.exports = {
    getByEmail,
};
