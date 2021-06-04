class AdminDao {
  constructor(connection) {
    this.connection = connection;
    this.USERABLE_TYPE = 'App/admin';
  }

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
    FROM nodejs_api.user usr
    LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.deleted_at IS NULL`;

    return this.connection.query(query);
  }

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
    FROM nodejs_api.user usr
    LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.deleted_at IS NOT NULL`;

    return this.connection.query(query);
  }

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
    FROM nodejs_api.user usr
    LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}'`;

    return this.connection.query(query);
  }

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
    FROM nodejs_api.user usr
    LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.userable_id = ? AND usr.deleted_at IS NULL`;

    return this.connection.query(query, [id]);
  }

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
    FROM nodejs_api.user usr
    LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.userable_id = ? AND usr.deleted_at IS NOT NULL`;

    return this.connection.query(query, [id]);
  }

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
  FROM nodejs_api.user usr
  LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
  WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.email = ? AND usr.deleted_at IS NULL`;

    return this.connection.query(query, [email]);
  }

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
    FROM nodejs_api.user usr
    LEFT JOIN nodejs_api.admin adm ON usr.userable_id = adm.id
    WHERE usr.userable_type = '${this.USERABLE_TYPE}' AND usr.email = ?`;

    return this.connection.query(query, [email]);
  }

  async create(admin) {
    const query = 'INSERT INTO admin SET ?';

    return this.connection.query(query, [admin]);
  }

  async update(adminId, admin) {
    const query = 'UPDATE admin SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [admin, adminId]);
  }

  async delete(adminId) {
    const query = `UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE userable_type = '${this.USERABLE_TYPE}' AND userable_id = ? LIMIT 1`;

    return this.connection.query(query, [adminId]);
  }

  async restore(adminId) {
    const query = `UPDATE user SET deleted_at = NULL WHERE userable_type = '${this.USERABLE_TYPE}' AND userable_id = ? LIMIT 1`;

    return this.connection.query(query, [adminId]);
  }
}

module.exports = AdminDao;
