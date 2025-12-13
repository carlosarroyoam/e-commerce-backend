/**
 * UserDao class.
 */
class UserDao {
  /**
   * UserDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all users.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.status The user status to query.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The query result.
   */
  async getAll({ page, size, sort = 'id', status, search }) {
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
      query += ` AND MATCH(first_name, last_name) AGAINST("${this.connection.escape(
        search
      )}*" IN BOOLEAN MODE)`;
    }

    if (sort) {
      let order = 'ASC';

      if (sort.charAt(0) === '-') {
        order = 'DESC';
        sort = sort.substring(1);
      }

      query += ` ORDER BY ${this.connection.escapeId(sort)} ${order}`;
    }

    query += ` LIMIT ${this.connection.escape((page - 1) * size)}, ${this.connection.escape(size)}`;

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to count all users.
   *
   * @param {object} queryOptions The query options.
   * @param {string} queryOptions.status The user status to query.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The query result.
   */
  async count({ status, search }) {
    let query = `SELECT
        count(usr.id) as count
    FROM users usr
    WHERE 1`;

    if (status) {
      if (status === 'active') {
        query += ' AND usr.deleted_at IS NULL';
      } else {
        query += ' AND usr.deleted_at IS NOT NULL';
      }
    }

    if (search) {
      query += ` AND MATCH(first_name, last_name) AGAINST("${this.connection.escape(
        search
      )}*" IN BOOLEAN MODE)`;
    }

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a user by its id.
   *
   * @param {number} user_id The id of the user to query.
   * @return {Promise} The query result.
   */
  async getById(user_id) {
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

    return this.connection.query(query, [user_id]);
  }

  /**
   * Performs the SQL query to get a user by its email address.
   *
   * @param {string} email The email of the user to query.
   * @return {Promise} The query result.
   */
  async getByEmail(email) {
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

    return this.connection.query(query, [email]);
  }

  /**
   * Performs the SQL query to insert a user.
   *
   * @param {object} user The user to store.
   * @return {Promise} The query result.
   */
  async create(user) {
    const query = 'INSERT INTO users SET ?';

    return this.connection.query(query, [user]);
  }

  /**
   * Performs the SQL query to update a user.
   *
   * @param {object} user The user to update.
   * @param {number} user_id The id of the user to update.
   * @return {Promise} The query result.
   */
  async update(user, user_id) {
    const query = 'UPDATE users SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [user, user_id]);
  }

  /**
   * Performs the SQL query to delete a user.
   *
   * @param {number} user_id The id of the user to delete.
   * @return {Promise} The query result.
   */
  async deleteById(user_id) {
    const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

    return this.connection.query(query, [user_id]);
  }

  /**
   * Performs the SQL query to restore a user.
   *
   * @param {number} user_id The id of the user to restore.
   * @return {Promise} The query result.
   */
  async restore(user_id) {
    const query = 'UPDATE users SET deleted_at = NULL WHERE id = ? LIMIT 1';

    return this.connection.query(query, [user_id]);
  }
}

export default UserDao;
