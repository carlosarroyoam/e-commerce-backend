const productDao = require('./productVariant.dao');

/**
 * Retrieves all product variants by product_id.
 *
 * @param {number} product_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByProductId = async (product_id, connection) => {
  const [result] = await productDao.getByProductId(product_id, connection);

  return result;
};

/**
 * Retrieves all product attributes by product_id.
 *
 * @param {number} variant_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAttributesByVariantId = async (variant_id, connection) => {
  const [result] = await productDao.getAttributesByVariantId(variant_id, connection);

  return result;
};

module.exports = {
  findByProductId,
  findAttributesByVariantId,
};
