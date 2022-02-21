const productVariantDao = require('./productVariant.dao');

/**
 * Retrieves product variant by its id.
 *
 * @param {number} product_id The id of the product.
 * @param {number} variant_id The id of the variant.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (product_id, variant_id, connection) => {
  const [[result]] = await productVariantDao.getById(product_id, variant_id, connection);

  return result;
};

/**
 * Retrieves all product variants by product_id.
 *
 * @param {number} product_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByProductId = async (product_id, connection) => {
  const [result] = await productVariantDao.getByProductId(product_id, connection);

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
  const [result] = await productVariantDao.getAttributesByVariantId(variant_id, connection);

  return result;
};

module.exports = {
  findById,
  findByProductId,
  findAttributesByVariantId,
};
