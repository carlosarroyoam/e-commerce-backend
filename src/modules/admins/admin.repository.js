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
   * @param {any} connection
   * @return {Promise} The query result
   */
  async findAll({ orderBy, userStatus, search }, connection) {
    const [result] = await this.adminDao.getAll({ orderBy, userStatus, search }, connection);

    return result;
  }

  /**
   * @param {number} adminId
   * @param {any} connection
   * @return {Promise} The query result
   */
  async findById(adminId, connection) {
    const [[result]] = await this.adminDao.getById(adminId, connection);

    return result;
  }

  /**
   * @param {string} email
   * @param {any} connection
   * @return {Promise} The query result
   */
  async findByEmail(email, connection) {
    const [[result]] = await this.adminDao.getByEmail(email, connection);

    return result;
  }

  /**
   * @param {object} user
   * @param {any} connection
   */
  async store(user, connection) {
    const userDbEntity = this.adminMapper.toDatabaseEntity(user);

    const [result] = await this.adminDao.create(userDbEntity, connection);

    return result.insertId;
  }

  /**
   * @param {object} user
   * @param {number} user_id
   * @param {any} connection
   * @return {Promise} The query result
   */
  async update(user, user_id, connection) {
    const userDbEntity = this.adminMapper.toDatabaseEntity(user);

    const [result] = await this.adminDao.update(userDbEntity, user_id, connection);

    return result.affectedRows;
  }
}

module.exports = AdminRepository;
