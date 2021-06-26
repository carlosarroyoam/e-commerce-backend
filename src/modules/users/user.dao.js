/**
* Performs the SQL query to get all non-deleted/active users.
*
* @returns {Promise}
*/
const getAll = async ({
  skip = 0, limit = 20,
}, connection) => {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE deleted_at IS NULL
      LIMIT ?, ?`;

  return connection.query(query, [Number(skip), Number(limit)]);
};

/**
* Performs the SQL query to get all deleted/inactive users.
*
* @returns {Promise}
*/
const getTrashed = async (connection) => {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE deleted_at IS NOT NULL`;

  return connection.query(query);
};

/**
* Performs the SQL query to get all users.
*
* @returns {Promise}
*/
const getAllWithTrashed = async (connection) => {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user`;

  return connection.query(query);
};

/**
 * Performs the SQL query to get a non-deleted/active user by its id.
 *
 * @param {object} data
 * @returns {Promise}
 */
const getById = async ({ id }, connection) => {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE id = ? AND deleted_at IS NULL`;

  return connection.query(query, [id]);
};

/**
 * Performs the SQL query to get a deleted/inactive user by its id.
 *
 * @param {object} data
 * @returns {Promise}
 */
const getTrashedById = async ({ id }, connection) => {
  const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE id = ? AND deleted_at IS NOT NULL`;

  return connection.query(query, [id]);
};

/**
 * Performs the SQL query to get a non-deleted/active user by its email address.
 *
 * @param {object} data
 * @returns {Promise}
 */
const getByEmail = async ({ email }, connection) => {
  const query = 'SELECT id, email, password FROM user WHERE email = ? AND deleted_at IS NULL';

  return connection.query(query, [email]);
};

/**
 * Performs the SQL query to get a user by its email address.
 *
 * @param {object} data
 * @returns {Promise}
 */
const getByEmailWithTrashed = async ({ email }, connection) => {
  const query = 'SELECT id FROM user WHERE email = ?';

  return connection.query(query, [email]);
};

/**
 * Performs the SQL query to insert a user.
 *
 * @param {object} user
 * @returns {Promise}
 */
const create = async (user, connection) => {
  const query = 'INSERT INTO user SET ?';

  return connection.query(query, [user]);
};

/**
 * Performs the SQL query to update a user.
 *
 * @param {object} data
 * @param {number} id
 * @returns {Promise}
 */
const update = async ({ user }, id, connection) => {
  const query = 'UPDATE user SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [user, id]);
};

/**
 * Performs the SQL query to set a deleted/inactive state to a user.
 *
 * @param {object} data
 * @returns {Promise}
 */
const inactivate = async ({ id }, connection) => {
  const query = 'UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

  return connection.query(query, [id]);
};

/**
 * Performs the SQL query to set a non-deleted/active state to a user.
 *
 * @param {object} data
 * @returns {Promise}
 */
const restore = async ({ id }, connection) => {
  const query = 'UPDATE user SET deleted_at = NULL WHERE id = ? LIMIT 1';

  return connection.query(query, [id]);
};

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
