const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const productRepository = require('./product.repository');
const productVariantRepository = require('../productVariants/productVariant.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all products.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.search The search criteria.
 * @return {Promise} The list of products.
 */
const findAll = async ({ skip, limit, sort, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const rawProducts = await productRepository.findAll({ skip, limit, sort, search }, connection);

    const products = await Promise.all(
      rawProducts.map(async (product) => {
        const propertiesByProductId = await productRepository.findAttributesByProductId(
          product.id,
          connection
        );

        const rawVariantsByProductId = await productVariantRepository.findByProductId(
          product.id,
          connection
        );

        const variantsByProductId = await Promise.all(
          rawVariantsByProductId.map(async (variant) => {
            const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
              variant.id,
              connection
            );

            return {
              ...variant,
              attribute_combinations: attributesByVariantId,
            };
          })
        );

        const imagesByProductId = await productRepository.findImagesByProductId(
          product.id,
          connection
        );

        return {
          ...product,
          properties: propertiesByProductId,
          variants: variantsByProductId,
          images: imagesByProductId,
        };
      })
    );

    connection.release();

    return products;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving products');
    }

    throw err;
  }
};

/**
 * Retrieves a product by its id.
 *
 * @param {number} product_id The id of the product to retrieve.
 * @return {Promise} The product.
 */
const findById = async (product_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const productById = await productRepository.findById(product_id, connection);

    if (!productById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const propertiesByProductId = await productRepository.findAttributesByProductId(
      product_id,
      connection
    );

    const rawVariantsByProductId = await productVariantRepository.findByProductId(
      product_id,
      connection
    );

    const variantsByProductId = await Promise.all(
      rawVariantsByProductId.map(async (variant) => {
        const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
          variant.id,
          connection
        );

        return {
          ...variant,
          attribute_combinations: attributesByVariantId,
        };
      })
    );

    const imagesByProductId = await productRepository.findImagesByProductId(product_id, connection);

    connection.release();

    return {
      ...productById,
      properties: propertiesByProductId,
      variants: variantsByProductId,
      images: imagesByProductId,
    };
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving product');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
};
