class UserDao {
  constructor(connection) {
    this.connection = connection;
  }

  async getByEmail(email) {
    const query = 'SELECT id, email, password FROM user WHERE email = ? AND deleted_at IS NULL';

    return this.connection.query(query, [email]);
  }
}

module.exports = UserDao;
