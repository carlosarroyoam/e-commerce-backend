/**
 * This class contains methods for admin users management in
 * the database.
 */
class AdminDao {
  /**
   * Constructor for AdminDao.
   *
   * @param {*} connection The actual connection
   */
  constructor(connection) {
    this.connection = connection;
    this.USERABLE_TYPE = 'App/admin';
  }

  /**
  * Performs the SQL query to get all non-deleted/active admin users.
  *
  * @returns {Promise}
  */
  async getAll() {
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
    FROM user usr
    LEFT JOIN admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.deleted_at IS NULL`;

    return this.connection.query(query);
  }

  /**
  * Performs the SQL query to get all deleted/inactive admin users.
  *
  * @returns {Promise}
  */
  async getTrashed() {
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
    FROM user usr
    LEFT JOIN admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.deleted_at IS NOT NULL`;

    return this.connection.query(query);
  }

  /**
  * Performs the SQL query to get all users.
  *
  * @returns {Promise}
  */
  async getAllWithTrashed() {
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
    FROM user usr
    LEFT JOIN admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}'`;

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a non-deleted/active admin user by its id.
   *
   * @param {number} id
   * @returns {Promise}
   */
  async getById(id) {
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
    FROM user usr
    LEFT JOIN admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.userable_id = ? AND usr.deleted_at IS NULL`;

    return this.connection.query(query, [id]);
  }

  /**
  * Performs the SQL query to get a deleted/inactive admin user by its id.
  *
  * @param {number} id
  * @returns {Promise}
  */
  async getTrashedById(id) {
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
    FROM user usr
    LEFT JOIN admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.userable_id = ? AND usr.deleted_at IS NOT NULL`;

    return this.connection.query(query, [id]);
  }

  /**
  * Performs the SQL query to get a non-deleted/active admin user by its email address.
  *
  * @returns {Promise}
  */
  async getByEmail(email) {
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
  FROM user usr
  LEFT JOIN admin adm ON usr.userable_id = adm.id
  WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.email = ? AND usr.deleted_at IS NULL`;

    return this.connection.query(query, [email]);
  }

  /**
  * Performs the SQL query to get a admin user by its email address.
  *
  * @param {string} email
  * @returns {Promise}
  */
  async getByEmailWithTrashed(email) {
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
    FROM user usr
    LEFT JOIN admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.email = ?`;

    return this.connection.query(query, [email]);
  }

  /**
  * Performs the SQL query to insert a admin user.
  *
  * @param {object} admin
  * @returns {Promise}
  */
  async create(admin) {
    const query = 'INSERT INTO admin SET ?';

    return this.connection.query(query, [admin]);
  }

  /**
  * Performs the SQL query to update a admin user.
  *
  * @param {number} adminId
  * @param {object} admin
  * @returns {Promise}
  */
  async update(adminId, admin) {
    const query = 'UPDATE admin SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [admin, adminId]);
  }

  /**
  * Performs the SQL query to set a deleted/inactive state to a admin user.
  *
  * @param {number} adminId
  * @returns {Promise}
  */
  async delete(adminId) {
    const query = `UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE userable_type = '${this.USERABLE_TYPE}' AND userable_id = ? LIMIT 1`;

    return this.connection.query(query, [adminId]);
  }

  /**
  * Performs the SQL query to set a non-deleted/active state to a admin user.
  *
  * @param {number} adminId
  * @returns {Promise}
  */
  async restore(adminId) {
    const query = `UPDATE user SET deleted_at = NULL WHERE userable_type = '${this.USERABLE_TYPE}' AND userable_id = ? LIMIT 1`;

    return this.connection.query(query, [adminId]);
  }
}

module.exports = AdminDao;
