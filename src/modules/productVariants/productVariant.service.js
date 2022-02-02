const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const productRepository = require('../products/product.repository');
const productVariantRepository = require('./productVariant.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all product variants.
 *
 * @param {number} product_id The query options.
 * @return {Promise} The list of products.
 */
const findAll = async (product_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const variants = await productVariantRepository.findByProductId(product_id, connection);

    connection.release();

    return variants;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving product variants');
    }

    throw err;
  }
};

/**
 * Retrieves a product variant by its id.
 *
 * @param {number} product_id The id of the product.
 * @param {number} variant_id The id of the variant to retrieve.
 * @return {Promise} The variant.
 */
const findById = async (product_id, variant_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const productById = await productRepository.findById(product_id, connection);

    if (!productById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const variantById = await productVariantRepository.findById(product_id, variant_id, connection);

    if (!variantById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    connection.release();

    return variantById;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving product variant');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
};
