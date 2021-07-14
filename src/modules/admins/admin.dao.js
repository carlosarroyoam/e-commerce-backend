/**
 * Performs the SQL query to get all non-deleted/active admin users.
 *
 * @param {any} connection
 * @return {Promise}
 */
async function getAll(connection) {
    const query = `SELECT 
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at
    FROM admins adm
    LEFT JOIN users usr ON adm.id = usr.id
    WHERE usr.deleted_at IS NULL`;

    return connection.query(query);
}

/**
 * Performs the SQL query to get all deleted/inactive admin users.
 *
 * @param {any} connection
 * @return {Promise}
 */
async function getTrashed(connection) {
    const query = `SELECT 
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.id = usr.id
    WHERE usr.deleted_at IS NOT NULL`;

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
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.id = usr.id`;

    return connection.query(query);
}

/**
 * Performs the SQL query to get a non-deleted/active admin user by its id.
 *
 * @param {number} adminId
 * @param {any} connection
 * @return {Promise}
 */
async function getById(adminId, connection) {
    const query = `SELECT 
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
    WHERE adm.id = ? AND usr.deleted_at IS NULL`;

    return connection.query(query, [adminId]);
}

/**
 * Performs the SQL query to get a deleted/inactive admin user by its id.
 *
 * @param {number} adminId
 * @param {any} connection
 * @return {Promise}
 */
async function getTrashedById(adminId, connection) {
    const query = `SELECT 
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
    WHERE adm.id = ? AND usr.deleted_at IS NOT NULL`;

    return connection.query(query, [adminId]);
}

/**
 * Performs the SQL query to get a non-deleted/active admin user by its email address.
 *
 * @param {string} email
 * @param {any} connection
 * @return {Promise}
 */
async function getByEmail(email, connection) {
    const query = `SELECT 
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
    WHERE usr.email = ? AND usr.deleted_at IS NULL`;

    return connection.query(query, [email]);
}

/**
 * Performs the SQL query to get a admin user by its email address.
 *
 * @param {string} email
 * @param {any} connection
 * @return {Promise}
 */
async function getByEmailWithTrashed(email, connection) {
    const query = `SELECT 
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
    WHERE usr.email = ?`;

    return connection.query(query, [email]);
}

/**
 * Performs the SQL query to insert a admin user.
 *
 * @param {object} admin
 * @param {any} connection
 * @return {Promise}
 */
async function create(admin, connection) {
    const query = 'INSERT INTO admins SET ?';

    return connection.query(query, [admin]);
}

/**
 * Performs the SQL query to update a admin user.
 *
 * @param {object} admin
 * @param {number} adminId
 * @param {any} connection
 * @return {Promise}
 */
async function update(admin, adminId, connection) {
    const query = 'UPDATE admins SET ? WHERE id = ? LIMIT 1';

    return connection.query(query, [admin, adminId]);
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
};
