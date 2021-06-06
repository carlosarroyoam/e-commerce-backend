/**
 * This class contains methods for user/auth management in
 * the database.
 */
class AuthDao {
  /**
   * Constructor for AuthDao.
   *
   * @param {*} connection The actual connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
  * Performs the SQL query to get a non-deleted/active user by its email address.
  *
  * @returns {Promise}
  */
  async getByEmail(email) {
    const query = 'SELECT id, email, password FROM user WHERE email = ? AND deleted_at IS NULL';

    return this.connection.query(query, [email]);
  }
}

module.exports = AuthDao;
