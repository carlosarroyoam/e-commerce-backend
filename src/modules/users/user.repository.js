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
   * @return {Promise} The result of the query
   * @param {any} connection
   */
  async findAll({ skip, orderBy, userStatus, search }, connection) {
    const [result] = await this.userDao.getAll({ skip, orderBy, userStatus, search }, connection);

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
    const [result] = await this.userDao.getById(user_id, connection);

    return result[0];
  }

  /**
   * Retrieves a deleted/non-active user by its id.
   *
   * @param {number} user_id
   * @return {Promise} The result of the query
   * @param {any} connection
   */
  async findTrashedById(user_id, connection) {
    const [result] = await this.userDao.getTrashedById(user_id, connection);

    return result[0];
  }

  /**
   * Retrieves a user by its id.
   *
   * @param {number} user_id
   * @return {Promise} The result of the query
   * @param {any} connection
   */
  async findByIdwithTrashed(user_id, connection) {
    const [result] = await this.userDao.getByIdWithTrashed(user_id, connection);

    return result[0];
  }

  /**
   * Retrieves a non-deleted/active user by its email address.
   *
   * @param {string} email
   * @param {any} connection
   * @return {Promise} The result of the query
   */
  async findByEmail(email, connection) {
    const [result] = await this.userDao.getByEmail(email, connection);

    return result[0];
  }

  /**
   * Retrieves a deleted/non-active user by its email address.
   * @param {string} email
   * @return {Promise} The result of the query
   * @param {any} connection
   */
  async findByEmailWithTrashed(email, connection) {
    const [result] = await this.userDao.getByEmailWithTrashed(email, connection);

    return result[0];
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

    return result.affectedRows;
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

    return result.affectedRows;
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

    return result.affectedRows;
  }
}

module.exports = UserRepository;
