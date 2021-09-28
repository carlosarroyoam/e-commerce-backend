/**
 * Performs the SQL query to get all users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.status The user status to query.
 * @param {string} queryOptions.search The search criteria.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAll({ skip = 0, limit = 50, sort = 'id', status, search }, connection) {
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

  if (status) {
    if (status === 'active') {
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

  if (sort) {
    let order = 'ASC';

    if (sort.charAt(0) === '-') {
      order = 'DESC';
      sort = sort.substring(1);
    }

    query += ` ORDER BY ${connection.escapeId(sort)} ${order}`;
  }

  query += ` LIMIT ${connection.escape(skip)}, ${connection.escape(limit)}`;

  return connection.query(query, [skip, limit]);
}

/**
 * Performs the SQL query to get a user by its id.
 *
 * @param {number} user_id The id of the user to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
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
 * Performs the SQL query to get a user by its email address.
 *
 * @param {string} email The email of the user to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
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
        WHERE usr.email = ?`;

  return connection.query(query, [email]);
}

/**
 * Performs the SQL query to insert a user.
 *
 * @param {object} user The user to store.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function create(user, connection) {
  const query = 'INSERT INTO users SET ?';

  return connection.query(query, [user]);
}

/**
 * Performs the SQL query to update a user.
 *
 * @param {object} user The user to update.
 * @param {number} user_id The id of the user to update.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function update(user, user_id, connection) {
  const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [user, user_id]);
}

/**
 * Performs the SQL query to delete a user.
 *
 * @param {number} user_id The id of the user to delete.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function deleteById(user_id, connection) {
  const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

  return connection.query(query, [user_id]);
}

/**
 * Performs the SQL query to restore a user.
 *
 * @param {number} user_id The id of the user to restore.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function restore(user_id, connection) {
  const query = 'UPDATE users SET deleted_at = NULL WHERE id = ? LIMIT 1';

  return connection.query(query, [user_id]);
}

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteById,
  restore,
};
