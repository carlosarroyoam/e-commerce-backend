/**
  * Performs the SQL query to get a non-deleted/active user by its email address.
  *
  * @returns {Promise}
  */
const getByEmail = async (email, connection) => {
  const query = 'SELECT id, email, password FROM user WHERE email = ? AND deleted_at IS NULL';

  return connection.query(query, [email]);
};

module.exports = {
  getByEmail,
};
