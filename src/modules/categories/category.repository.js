const categoryDao = require('./category.dao');

/**
 * Retrieves all categories.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAll = async ({ skip, limit, sort }, connection) => {
  const [result] = await categoryDao.getAll({ skip, limit, sort }, connection);

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
