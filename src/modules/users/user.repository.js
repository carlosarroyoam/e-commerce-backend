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
   * @param {number} id
   * @returns {Promise} The result of the query
   */
  async findById(id, connection) {
    const [result] = await this.userDao.getById({ id }, connection);

    return result[0];
  }

  /**
   *  Retrieves a deleted/non-active user by its id.
   *
   * @param {number} id
   * @returns {Promise} The result of the query
   */
  async findTrashedById(id, connection) {
    const [result] = await this.userDao.getTrashedById(id, connection);

    return result[0];
  }

  /**
   *  Retrieves a non-deleted/active user by its email address.
   *
   * @param {string} email
   * @returns {Promise} The result of the query
   */
  async findByEmail(email, connection) {
    const [result] = await this.userDao.getByEmail({ email }, connection);

    return result[0];
  }

  /**
   *  Retrieves a deleted/non-active user by its email address.
   *
   * @param {string} email
   * @returns {Promise} The result of the query
   */
  async findByEmailWithTrashed(email, connection) {
    const [result] = await this.userDao.getByEmailWithTrashed(email, connection);

    return result[0];
  }

  /**
   *  Stores a user.
   *
   * @param {object} user
   * @returns {Promise} The result of the query
   */
  async store(user, connection) {
    const userDbEntity = this.userMapper.toDatabaseEntity(user);

    const [result] = await this.userDao.create(userDbEntity, connection);

    return result.insertId;
  }

  /**
   *  Updates a user.
   *
   * @param {number} id
   * @param {object} user
   * @returns {Promise} The result of the query
   */
  async update(id, user, connection) {
    const userDbEntity = this.userMapper.toDatabaseEntity(user, connection);

    const [result] = await this.userDao.update(id, userDbEntity, connection);

    return result.affectedRows;
  }

  /**
   *  Deletes a user.
   *
   * @param {number} id
   * @returns {Promise} The result of the query
   */
  async delete(id, connection) {
    const [result] = await this.userDao.inactivate(id, connection);

    return result.affectedRows;
  }

  /**
   *  Restores a user.
   *
   * @param {number} id
   * @returns {Promise} The result of the query
   */
  async restore(id, connection) {
    const [result] = await this.userDao.restore(id, connection);

    return result.affectedRows;
  }
}

module.exports = UserRepository;
