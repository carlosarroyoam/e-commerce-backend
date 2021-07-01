/**
 * Performs the SQL query to get all non-deleted/active users.
 *
 * @param {object} pagination
 * @param {any} connection
 * @returns {Promise}
 */
async function getAll({
  skip = 0, limit = 20,
}, connection) {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM users
      WHERE deleted_at IS NULL
      LIMIT ?, ?`;

  return connection.query(query, [Number(skip), Number(limit)]);
}

/**
 * Performs the SQL query to get all deleted/inactive users.
 *
 * @returns {Promise}
 * @param {any} connection
 */
async function getTrashed(connection) {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM users
      WHERE deleted_at IS NOT NULL`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get all users.
 *
 * @returns {Promise}
 * @param {any} connection
 */
async function getAllWithTrashed(connection) {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM users`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a non-deleted/active user by its id.
 *
 * @param {object} data
 * @param {any} connection
 * @returns {Promise}
 */
async function getById({ id }, connection) {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM users
      WHERE id = ? AND deleted_at IS NULL`;

  return connection.query(query, [id]);
}

/**
 * Performs the SQL query to get a deleted/inactive user by its id.
 *
 * @param {object} data
 * @param {any} connection
 * @returns {Promise}
 */
async function getTrashedById({ id }, connection) {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM users
      WHERE id = ? AND deleted_at IS NOT NULL`;

  return connection.query(query, [id]);
}

/**
 * Performs the SQL query to get a non-deleted/active user by its email address.
 *
 * @param {object} data
 * @param {any} connection
 * @returns {Promise}
 */
async function getByEmail({ email }, connection) {
  const query = 'SELECT id, email, password FROM users WHERE email = ? AND deleted_at IS NULL';

  return connection.query(query, [email]);
}

/**
 * Performs the SQL query to get a user by its email address.
 *
 * @param {object} data
 * @param {any} connection
 * @returns {Promise}
 */
async function getByEmailWithTrashed({ email }, connection) {
  const query = 'SELECT id FROM users WHERE email = ?';

  return connection.query(query, [email]);
}

/**
 * Performs the SQL query to insert a user.
 *
 * @param {object} user
 * @param {any} connection
 * @returns {Promise}
 */
async function create(user, connection) {
  const query = 'INSERT INTO users SET ?';

  return connection.query(query, [user]);
}

/**
 * Performs the SQL query to update a user.
 *
 * @param {object} data
 * @param {number} id
 * @param {any} connection
 * @returns {Promise}
 */
async function update({ user }, id, connection) {
  const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [user, id]);
}

/**
 * Performs the SQL query to set a deleted/inactive state to a user.
 *
 * @param {object} data
 * @param {any} connection
 * @returns {Promise}
 */
async function inactivate({ id }, connection) {
  const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

  return connection.query(query, [id]);
}

/**
 * Performs the SQL query to set a non-deleted/active state to a user.
 *
 * @param {object} data
 * @param {any} connection
 * @returns {Promise}
 */
async function restore({ id }, connection) {
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
