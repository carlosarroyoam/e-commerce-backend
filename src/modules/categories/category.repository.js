const categoryDao = require('./category.dao');
const categoryMapper = require('./category.mapper');

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

/**
 * Retrieves a category by its title.
 *
 * @param {number} title The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByTitle = async (title, connection) => {
  const [[result]] = await categoryDao.getByTitle(title, connection);

  return result;
};

/**
 * Stores a category.
 *
 * @param {object} category The category to store.
 * @param {any} connection The database connection object.
 */
const store = async (category, connection) => {
  const categoryDbEntity = categoryMapper.toDatabaseEntity(category);

  const [result] = await categoryDao.create(categoryDbEntity, connection);

  return result.insertId;
};

module.exports = {
  findAll,
  findById,
  findByTitle,
  store,
};
