const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const productRepository = require('./product.repository');
const ProductVariantRepository = require('../productVariants/productVariant.repository');
const sharedErrors = require('../../shared/errors');
const stringUtils = require('../../shared/utils/string.utils');
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
async function findAll({ skip, limit, sort, search }) {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();
    const productVariantRepository = new ProductVariantRepository(connection);

    const rawProducts = await productRepository.findAll({ skip, limit, sort, search }, connection);

    const products = await Promise.all(
      rawProducts.map(async (product) => {
        const propertiesByProductId = await productRepository.findAttributesByProductId(
          product.id,
          connection
        );

        const rawVariantsByProductId = await productVariantRepository.findByProductId(product.id);

        const variantsByProductId = await Promise.all(
          rawVariantsByProductId.map(async (variant) => {
            const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
              variant.id
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

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while retrieving products' });
    }

    throw err;
  }
}

/**
 * Retrieves a product by its id.
 *
 * @param {number} product_id The id of the product to retrieve.
 * @return {Promise} The product.
 */
async function findById(product_id) {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();
    const productVariantRepository = new ProductVariantRepository(connection);

    const productById = await productRepository.findById(product_id, connection);

    if (!productById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const propertiesByProductId = await productRepository.findAttributesByProductId(
      product_id,
      connection
    );

    const rawVariantsByProductId = await productVariantRepository.findByProductId(product_id);

    const variantsByProductId = await Promise.all(
      rawVariantsByProductId.map(async (variant) => {
        const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
          variant.id
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

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while retrieving product' });
    }

    throw err;
  }
}

/**
 * Stores a product.
 *
 * @param {object} product The product to store.
 * @return {Promise} The created product.
 */
async function store(product) {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();
    const productVariantRepository = new ProductVariantRepository(connection);

    connection.beginTransaction();

    const slug = stringUtils.slugify(product.title);

    const productBySlug = await productRepository.findBySlug(slug, connection);

    if (productBySlug) {
      throw new sharedErrors.BadRequestError({
        message: `The product with title: '${product.title}' already exists`,
      });
    }

    const createdProductId = await productRepository.store({ ...product, slug }, connection);

    const productById = await productRepository.findById(createdProductId, connection);

    const propertiesByProductId = await productRepository.findAttributesByProductId(
      productById.id,
      connection
    );

    const rawVariantsByProductId = await productVariantRepository.findByProductId(productById.id);

    const variantsByProductId = await Promise.all(
      rawVariantsByProductId.map(async (variant) => {
        const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
          variant.id
        );

        return {
          ...variant,
          attribute_combinations: attributesByVariantId,
        };
      })
    );

    const imagesByProductId = await productRepository.findImagesByProductId(
      productById.id,
      connection
    );

    connection.rollback();

    connection.release();

    return {
      ...productById,
      properties: propertiesByProductId,
      variants: variantsByProductId,
      images: imagesByProductId,
    };
  } catch (err) {
    if (connection) {
      connection.rollback();

      connection.release();
    }

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while storing product' });
    }

    throw err;
  }
}

module.exports = {
  findAll,
  findById,
  store,
};
