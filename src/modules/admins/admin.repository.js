const AdminDao = require('./admin.dao');
const AdminMapper = require('./mappers/admin.mapper');

/**
 * Admin repository class.
 */
class AdminRepository {
  /**
   * Constructor for AdminRepository.
   *
   * @param {any} connection
   */
  constructor(connection) {
    this._adminDao = new AdminDao(connection);
    this._adminMapper = new AdminMapper();
  }

  /**
   *
   * @returns {Promise} The query result
   */
  async findAll() {
    const [result] = await this._adminDao.getAll();

    return result;
  }

  /**
   * @param {number} id
   * @returns {Promise} The query result
   */
  async findById(id) {
    const [result] = await this._adminDao.getById(id);

    return result[0];
  }

  /**
   * @param {number} userId
   */
  async findTrashedById(userId) {
    const [result] = await this._adminDao.getTrashedById(userId);

    return result[0];
  }

  /**
   * @param {string} email
   * @returns {Promise} The query result
   */
  async findByEmail(email) {
    const [result] = await this._adminDao.getByEmail(email);

    return result[0];
  }

  /**
   * @param {object} user
   */
  async store(user) {
    const userDbEntity = this._adminMapper.toDatabaseEntity(user);

    const [result] = await this._adminDao.create(userDbEntity);

    return result.insertId;
  }

  /**
   * @param {number} userId
   * @param {object} user
   * @returns {Promise} The query result
   */
  async update(userId, user) {
    const userDbEntity = this._adminMapper.toDatabaseEntity(user);

    const [result] = await this._adminDao.update(userId, userDbEntity);

    return result.affectedRows;
  }
}

module.exports = AdminRepository;
