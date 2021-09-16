/**
 * Performs the SQL query to get all non-deleted/active users.
 *
 * @param {object} pagination
 * @param {any} connection
 * @return {Promise}
 */
async function getAll({ skip = 0, limit = 50, order_by = 'id', user_status, search }, connection) {
  let query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at,
            usr.deleted_at
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE 1`;

  if (user_status) {
    if (user_status === 'active') {
      query += ' AND usr.deleted_at IS NULL';
    } else {
      query += ' AND usr.deleted_at IS NOT NULL';
    }
  }

  if (search) {
    query += ` AND MATCH(first_name, last_name) AGAINST("${connection.escape(
      search
    )}*" IN BOOLEAN MODE)`;
  }

  if (order_by) {
    let order = 'ASC';

    if (order_by.charAt(0) === '-') {
      order = 'DESC';
      order_by = order_by.substring(1);
    }

    query += ` ORDER BY ${connection.escapeId(order_by)} ${order}`;
  }

  query += ` LIMIT ${connection.escape(skip)}, ${connection.escape(limit)}`;

  return connection.query(query, [skip, limit]);
}

/**
 * Performs the SQL query to get a non-deleted/active user by its id.
 *
 * @param {number} user_id
 * @param {any} connection
 * @return {Promise}
 */
async function getById(user_id, connection) {
  const query = `SELECT
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usr.password,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at,
            usr.deleted_at
        FROM users usr
        LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
        WHERE usr.id = ?`;

  return connection.query(query, [user_id]);
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
            usr.password,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at,
            usr.deleted_at
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
  const query = `SELECT 
            usr.id,
            usr.first_name,
            usr.last_name,
            usr.email,
            usr.password,
            usrrl.id AS user_role_id,
            usrrl.type AS user_role,
            usr.created_at,
            usr.updated_at,
            usr.updated_at,
            usr.deleted_at
          FROM users usr
          LEFT JOIN user_roles usrrl ON usr.user_role_id = usrrl.id
          WHERE usr.email = ?`;

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
 * @param {number} user_id
 * @param {any} connection
 * @return {Promise}
 */
async function update(user, user_id, connection) {
  const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [user, user_id]);
}

/**
 * Performs the SQL query to set a deleted/inactive state to a user.
 *
 * @param {number} user_id
 * @param {any} connection
 * @return {Promise}
 */
async function inactivate(user_id, connection) {
  const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

  return connection.query(query, [user_id]);
}

/**
 * Performs the SQL query to set a non-deleted/active state to a user.
 *
 * @param {number} user_id
 * @param {any} connection
 * @return {Promise}
 */
async function restore(user_id, connection) {
  const query = 'UPDATE users SET deleted_at = NULL WHERE id = ? LIMIT 1';

  return connection.query(query, [user_id]);
}

module.exports = {
  getAll,
  getById,
  getByEmail,
  getByEmailWithTrashed,
  create,
  update,
  inactivate,
  restore,
};
