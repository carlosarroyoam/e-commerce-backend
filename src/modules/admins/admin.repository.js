/**
 * Admin repository class.
 */
class AdminRepository {
  /**
   * Constructor for UserRepository.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({ adminDao, adminMapper }) {
    this.adminDao = adminDao;
    this.adminMapper = adminMapper;
  }

  /**
   *
   * @returns {Promise} The query result
   */
  async findAll(connection) {
    const [result] = await this.adminDao.getAll(connection);

    return result;
  }

  /**
   * @param {number} id
   * @returns {Promise} The query result
   */
  async findById(id, connection) {
    const [result] = await this.adminDao.getById({ id }, connection);

    return result[0];
  }

  /**
   * @param {number} userId
   */
  async findTrashedById(userId, connection) {
    const [result] = await this.adminDao.getTrashedById({ userId }, connection);

    return result[0];
  }

  /**
   * @param {string} email
   * @returns {Promise} The query result
   */
  async findByEmail(email, connection) {
    const [result] = await this.adminDao.getByEmail({ email }, connection);

    return result[0];
  }

  /**
   * @param {object} user
   */
  async store(user, connection) {
    const userDbEntity = this.adminMapper.toDatabaseEntity(user);

    const [result] = await this.adminDao.create(userDbEntity, connection);

    return result.insertId;
  }

  /**
   * @param {number} userId
   * @param {object} user
   * @returns {Promise} The query result
   */
  async update(userId, user, connection) {
    const userDbEntity = this.adminMapper.toDatabaseEntity(user);

    const [result] = await this.adminDao.update(userDbEntity, userId, connection);

    return result.affectedRows;
  }
}

module.exports = AdminRepository;
