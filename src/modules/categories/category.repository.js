const categoryDao = require('./category.dao');

/**
 * Retrieves all categories.
 *
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAll = async (connection) => {
  const [result] = await categoryDao.getAll(connection);

  return result;
};

/**
 * Retrieves a category by its id.
 *
 * @param {number} category_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (category_id, connection) => {
  const [[result]] = await categoryDao.getById(category_id, connection);

  return result;
};

module.exports = {
  findAll,
  findById,
};
