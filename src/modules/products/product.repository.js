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
async function findAll({ skip, limit, sort, search }, connection) {
  const [result] = await productDao.getAll({ skip, limit, sort, search }, connection);

  return result;
}

/**
 * Retrieves a product by its id.
 *
 * @param {number} product_id The id of the product to retrieve.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (product_id, connection) => {
  const [[result]] = await productDao.getById(product_id, connection);

  return result;
};

/**
 * Retrieves a product by its slug.
 *
 * @param {string} slug The slug of the product to retrieve.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findBySlug = async (slug, connection) => {
  const [[result]] = await productDao.getBySlug(slug, connection);

  return result;
};

/**
 * Retrieves all product attributes by product_id.
 *
 * @param {number} product_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAttributesByProductId = async (product_id, connection) => {
  const [result] = await productDao.getAttributesByProductId(product_id, connection);

  return result;
};

/**
 * Retrieves all product images by product_id.
 *
 * @param {number} product_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findImagesByProductId = async (product_id, connection) => {
  const [result] = await productDao.getImagesByProductId(product_id, connection);

  return result;
};

/**
 * Stores a product.
 *
 * @param {object} product The product to store.
 * @param {any} connection The database connection object.
 */
const store = async (product, connection) => {
  const productDbEntity = productMapper.toDatabaseEntity(product);

  const [result] = await productDao.create(productDbEntity, connection);

  return result.insertId;
};

module.exports = {
  findAll,
  findById,
  findBySlug,
  findAttributesByProductId,
  findImagesByProductId,
  store,
};
