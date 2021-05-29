class UserDao {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE deleted_at IS NULL`;

    return this.connection.query(query);
  }

  async getById(id) {
    const query = `SELECT id, first_name, last_name, email, userable_type, userable_id, created_at, updated_at
      FROM user
      WHERE id = ? AND deleted_at IS NULL`;

    return this.connection.query(query, [id]);
  }

  async getByEmail(email) {
    const query = 'SELECT id FROM user WHERE email = ?';

    return this.connection.query(query, [email]);
  }

  async create(user) {
    const query = 'INSERT INTO user SET ?';

    return this.connection.query(query, [user]);
  }

  async update(userId, user) {
    const query = 'UPDATE user SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [user, userId]);
  }

  async delete(userId) {
    const query = 'UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

    return this.connection.query(query, [userId]);
  }

  async restore(userId) {
    const query = 'UPDATE user SET deleted_at = NULL WHERE id = ? LIMIT 1';

    return this.connection.query(query, [userId]);
  }
}

module.exports = UserDao;
