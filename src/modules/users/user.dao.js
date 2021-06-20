/**
 * This class contains methods for users management in
 * the database.
 */
class UserDao {
  /**
   * Constructor for UserDao.
   *
   * @param {*} connection The actual connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
  * Performs the SQL query to get all non-deleted/active users.
  *
  * @returns {Promise}
  */
  async getAll({ skip = 0 }) {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE deleted_at IS NULL
      LIMIT ?,100`;

    return this.connection.query(query, [Number(skip)]);
  }

  /**
  * Performs the SQL query to get all deleted/inactive users.
  *
  * @returns {Promise}
  */
  async getTrashed() {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE deleted_at IS NOT NULL`;

    return this.connection.query(query);
  }

  /**
  * Performs the SQL query to get all users.
  *
  * @returns {Promise}
  */
  async getAllWithTrashed() {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user`;

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a non-deleted/active user by its id.
   *
   * @param {number} id
   * @returns {Promise}
   */
  async getById(id) {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE id = ? AND deleted_at IS NULL`;

    return this.connection.query(query, [id]);
  }

  /**
   * Performs the SQL query to get a deleted/inactive user by its id.
   *
   * @param {number} id
   * @returns {Promise}
   */
  async getTrashedById(id) {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE id = ? AND deleted_at IS NOT NULL`;

    return this.connection.query(query, [id]);
  }

  /**
   * Performs the SQL query to get a non-deleted/active user by its email address.
   * @returns {Promise}
   * @param {string} email
   */
  async getByEmail(email) {
    const query = 'SELECT id, email, password FROM user WHERE email = ? AND deleted_at IS NULL';

    return this.connection.query(query, [email]);
  }

  /**
   * Performs the SQL query to get a user by its email address.
   *
   * @param {string} email
   * @returns {Promise}
   */
  async getByEmailWithTrashed(email) {
    const query = 'SELECT id FROM user WHERE email = ?';

    return this.connection.query(query, [email]);
  }

  /**
   * Performs the SQL query to insert a user.
   *
   * @param {object} user
   * @returns {Promise}
   */
  async create(user) {
    const query = 'INSERT INTO user SET ?';

    return this.connection.query(query, [user]);
  }

  /**
   * Performs the SQL query to update a user.
   *
   * @param {number} userId
   * @param {object} user
   * @returns {Promise}
   */
  async update(userId, user) {
    const query = 'UPDATE user SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [user, userId]);
  }

  /**
   * Performs the SQL query to set a deleted/inactive state to a user.
   *
   * @param {number} userId
   * @returns {Promise}
   */
  async delete(userId) {
    const query = 'UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

    return this.connection.query(query, [userId]);
  }

  /**
   * Performs the SQL query to set a non-deleted/active state to a user.
   *
   * @param {number} userId
   * @returns {Promise}
   */
  async restore(userId) {
    const query = 'UPDATE user SET deleted_at = NULL WHERE id = ? LIMIT 1';

    return this.connection.query(query, [userId]);
  }
}

module.exports = UserDao;
