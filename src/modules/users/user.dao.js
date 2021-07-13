/**
 * Performs the SQL query to get all non-deleted/active users.
 *
 * @param {object} pagination
 * @param {any} connection
 * @return {Promise}
 */
async function getAll({ skip = 0, limit = 20 }, connection) {
    const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE deleted_at IS NULL
        LIMIT ?, ?`;

    return connection.query(query, [skip, limit]);
}

/**
 * Performs the SQL query to get all deleted/inactive users.
 *
 * @param {any} connection
 * @return {Promise}
 */
async function getTrashed(connection) {
    const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at,
            usr.deleted_at,
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE deleted_at IS NULL`;

    return connection.query(query);
}

/**
 * Performs the SQL query to get all users.
 *
 * @param {any} connection
 * @return {Promise}
 */
async function getAllWithTrashed(connection) {
    const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at,
            usr.deleted_at,
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id`;

    return connection.query(query);
}

/**
 * Performs the SQL query to get a non-deleted/active user by its id.
 *
 * @param {number} id
 * @param {any} connection
 * @return {Promise}
 */
async function getById(id, connection) {
    const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE usr.id = ? AND usr.deleted_at IS NULL`;

    return connection.query(query, [id]);
}

/**
 * Performs the SQL query to get a deleted/inactive user by its id.
 *
 * @param {any} id
 * @param {any} connection
 * @return {Promise}
 */
async function getTrashedById(id, connection) {
    const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE usr.id = ? AND usr.deleted_at IS NOT NULL`;

    return connection.query(query, [id]);
}

/**
 * Performs the SQL query to get a non-deleted/active user by its email address.
 *
 * @param {string} email
 * @param {any} connection
 * @return {Promise}
 */
async function getByEmail(email, connection) {
    const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE usr.email = ? AND usr.deleted_at IS NULL`;

    return connection.query(query, [email]);
}

/**
 * Performs the SQL query to get a user by its email address.
 *
 * @param {string} email
 * @param {any} connection
 * @return {Promise}
 */
async function getByEmailWithTrashed(email, connection) {
    const query = `SELECT id FROM users WHERE email = ?`;

    return connection.query(query, [email]);
}

/**
 * Performs the SQL query to insert a user.
 *
 * @param {object} user
 * @param {any} connection
 * @return {Promise}
 */
async function create(user, connection) {
    const query = 'INSERT INTO users SET ?';

    return connection.query(query, [user]);
}

/**
 * Performs the SQL query to update a user.
 *
 * @param {object} user
 * @param {number} id
 * @param {any} connection
 * @return {Promise}
 */
async function update(user, id, connection) {
    const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

    return connection.query(query, [user, id]);
}

/**
 * Performs the SQL query to set a deleted/inactive state to a user.
 *
 * @param {number} id
 * @param {any} connection
 * @return {Promise}
 */
async function inactivate(id, connection) {
    const query =
        'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

    return connection.query(query, [id]);
}

/**
 * Performs the SQL query to set a non-deleted/active state to a user.
 *
 * @param {number} id
 * @param {any} connection
 * @return {Promise}
 */
async function restore(id, connection) {
    const query = 'UPDATE users SET deleted_at = NULL WHERE id = ? LIMIT 1';

    return connection.query(query, [id]);
}

module.exports = {
    getAll,
    getTrashed,
    getAllWithTrashed,
    getById,
    getTrashedById,
    getByEmail,
    getByEmailWithTrashed,
    create,
    update,
    inactivate,
    restore,
};
