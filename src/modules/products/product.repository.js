const productDao = require('./product.dao');
const productMapper = require('./product.mapper');

/**
 * Retrieves all products.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.search The search criteria.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAll = async ({ skip, limit, sort, search }, connection) => {
  const [result] = await productDao.getAll({ skip, limit, sort, search }, connection);

  return result;
};

module.exports = {
  findAll,
};
