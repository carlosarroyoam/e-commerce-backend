/**
 * User repository class.
 */
class UserRepository {
  /**
   * Constructor for UserRepository.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({ userDao, userMapper }) {
    this.userDao = userDao;
    this.userMapper = userMapper;
  }

  /**
   *  Retrieves all non-deleted/active users.
   *
   * @returns {Promise} The result of the query
   */
  async findAll({ skip }, connection) {
    const [result] = await this.userDao.getAll({ skip }, connection);

    return result;
  }

  /**
   *  Retrieves a non-deleted/active user by its id.
   *
   * @param {number} userId
   * @returns {Promise} The result of the query
   */
  async findById(userId) {
    const [result] = await this.userDao.getById(userId);

    return result[0];
  }

  /**
   *  Retrieves a deleted/non-active user by its id.
   *
   * @param {number} userId
   * @returns {Promise} The result of the query
   */
  async findTrashedById(userId) {
    const [result] = await this.userDao.getTrashedById(userId);

    return result[0];
  }

  /**
   *  Retrieves a non-deleted/active user by its email address.
   *
   * @param {string} email
   * @returns {Promise} The result of the query
   */
  async findByEmail(email) {
    const [result] = await this.userDao.getByEmail(email);

    return result[0];
  }

  /**
   *  Retrieves a deleted/non-active user by its email address.
   *
   * @param {string} email
   * @returns {Promise} The result of the query
   */
  async findByEmailWithTrashed(email) {
    const [result] = await this.userDao.getByEmailWithTrashed(email);

    return result[0];
  }

  /**
   *  Stores a user.
   *
   * @param {object} user
   * @returns {Promise} The result of the query
   */
  async store(user) {
    const userDbEntity = this.userMapper.toDatabaseEntity(user);

    const [result] = await this.userDao.create(userDbEntity);

    return result.insertId;
  }

  /**
   *  Updates a user.
   *
   * @param {number} userId
   * @param {object} user
   * @returns {Promise} The result of the query
   */
  async update(userId, user) {
    const userDbEntity = this.userMapper.toDatabaseEntity(user);

    const [result] = await this.userDao.update(userId, userDbEntity);

    return result.affectedRows;
  }

  /**
   *  Deletes a user.
   *
   * @param {number} userId
   * @returns {Promise} The result of the query
   */
  async delete(userId) {
    const [result] = await this.userDao.delete(userId);

    return result.affectedRows;
  }

  /**
   *  Restores a user.
   *
   * @param {number} userId
   * @returns {Promise} The result of the query
   */
  async restore(userId) {
    const [result] = await this.userDao.restore(userId);

    return result.affectedRows;
  }
}

module.exports = UserRepository;
