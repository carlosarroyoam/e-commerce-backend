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
   * Retrieves all non-deleted/active users.
   *
   * @return {Promise} The result of the query
   * @param {any} connection
   */
  async findAll({ skip, orderBy: order_by, userStatus: user_status, search }, connection) {
    const [result] = await this.userDao.getAll({ skip, order_by, user_status, search }, connection);

    return result;
  }

  /**
   * Retrieves a non-deleted/active user by its id.
   *
   * @param {number} user_id
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async findById(user_id, connection) {
    const [[result]] = await this.userDao.getById(user_id, connection);

    return result;
  }

  /**
   * Retrieves a non-deleted/active user by its email address.
   *
   * @param {string} email
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async findByEmail(email, connection) {
    const [[result]] = await this.userDao.getByEmail(email, connection);

    return result;
  }

  /**
   * Retrieves a deleted/non-active user by its email address.
   *
   * @param {string} email
   * @return {Promise} The result of the query
   * @param {any} connection
   */
  async findByEmailWithTrashed(email, connection) {
    const [[result]] = await this.userDao.getByEmailWithTrashed(email, connection);

    return result;
  }

  /**
   * Stores a user.
   *
   * @param {object} user
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async store(user, connection) {
    const userDbEntity = this.userMapper.toDatabaseEntity(user);

    const [result] = await this.userDao.create(userDbEntity, connection);

    return result.insertId;
  }

  /**
   * Updates a user.
   *
   * @param {object} user
   * @param {number} id
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async update(user, id, connection) {
    const userDbEntity = this.userMapper.toDatabaseEntity(user);

    const [result] = await this.userDao.update(userDbEntity, id, connection);

    return result.changedRows;
  }

  /**
   * Deletes a user.
   *
   * @param {number} id
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async delete(id, connection) {
    const [result] = await this.userDao.inactivate(id, connection);

    return result.changedRows;
  }

  /**
   * Restores a user.
   *
   * @param {number} id
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async restore(id, connection) {
    const [result] = await this.userDao.restore(id, connection);

    return result.changedRows;
  }
}

module.exports = UserRepository;
