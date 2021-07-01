/**
 * Performs the SQL query to get a non-deleted/active user by its email address.
 *
 * @returns {Promise}
 * @param {any} email
 * @param {any} connection
 */
async function getByEmail(email, connection) {
  const query = 'SELECT id, email, password, userable_type, userable_id FROM users WHERE email = ? AND deleted_at IS NULL';

  return connection.query(query, [email]);
}

module.exports = {
  getByEmail,
};
