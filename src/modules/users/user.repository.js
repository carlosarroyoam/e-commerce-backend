const userDao = require('./user.dao');
const userMapper = require('./user.mapper');

/**
 * Creates a userRepository object.
 *
 * @param {*} connection The database connection object. The database connection object.
 *
 * @return {object} The userRepository object.
 */
const userRepositoryFactory = (connection) => {
  /**
   * Retrieves all non-deleted/active users.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.skip The query skip.
   * @param {number} queryOptions.limit The query limit.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.status The user status to query.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The result of the query
   */
  const findAll = async ({ skip, limit, sort, status, search }) => {
    const [result] = await userDao.getAll({ skip, limit, sort, status, search }, connection);

    return result;
  };

  /**
   * Retrieves a non-deleted/active user by its id.
   *
   * @param {number} user_id The id of the user to query.
   * @return {Promise} The result of the query
   */
  const findById = async (user_id) => {
    const [[result]] = await userDao.getById(user_id, connection);

    return result;
  };

  /**
   * Retrieves a non-deleted/active user by its email address.
   *
   * @param {string} email
   * @return {Promise} The result of the query
   */
  const findByEmail = async (email) => {
    const [[result]] = await userDao.getByEmail(email, connection);

    return result;
  };

  /**
   * Stores a user.
   *
   * @param {object} user The user to store.
   * @return {Promise} The result of the query
   */
  const store = async (user) => {
    const userDbEntity = userMapper.toDatabaseEntity(user);

    const [result] = await userDao.create(userDbEntity, connection);

    return result.insertId;
  };

  /**
   * Updates a user.
   *
   * @param {object} user
   * @param {number} user_id The id of the user to update.
   * @return {Promise} The result of the query
   */
  const update = async (user, user_id) => {
    const userDbEntity = userMapper.toDatabaseEntity(user);

    const [result] = await userDao.update(userDbEntity, user_id, connection);

    return result.changedRows;
  };

  /**
   * Deletes a user.
   *
   * @param {number} user_id The id of the user to delete.
   * @return {Promise} The result of the query
   */
  const deleteById = async (user_id) => {
    const [result] = await userDao.deleteById(user_id, connection);

    return result.changedRows;
  };

  /**
   * Restores a user.
   *
   * @param {number} user_id The id of the user to restore.
   * @return {Promise} The result of the query
   */
  const restore = async (user_id) => {
    const [result] = await userDao.restore(user_id, connection);

    return result.changedRows;
  };

  return {
    findAll,
    findById,
    findByEmail,
    store,
    update,
    deleteById,
    restore,
  };
};

module.exports = userRepositoryFactory;
