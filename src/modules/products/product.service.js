const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const productRepository = require('./product.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all customer users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.search The search criteria.
 * @return {Promise} The list of customers.
 */
const findAll = async ({ skip, limit, sort, search }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const rawProducts = await productRepository.findAll({ skip, limit, sort, search }, connection);

    const products = await Promise.all(
      rawProducts.map(async (product) => {
        // const variantsByProductId = await productVariantRepository.findByCustomerId(
        //   product.id,
        //   connection
        // );

        // TODO add product variants query
        const variantsByProductId = [];

        return {
          ...product,
          variants: variantsByProductId,
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

module.exports = {
  findAll,
};
