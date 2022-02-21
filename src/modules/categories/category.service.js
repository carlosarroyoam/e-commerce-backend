const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const categoryRepository = require('./category.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all product variants.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @return {Promise} The list of products.
 */
const findAll = async ({ skip, limit, sort }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categories = await categoryRepository.findAll({ skip, limit, sort }, connection);

    connection.release();

    return categories;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while retrieving categories');
    }

    throw err;
  }
};

/**
 * Retrieves a category by its id.
 *
 * @param {number} category_id The id of the category to retrieve.
 * @return {Promise} The variant.
 */
const findById = async (category_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categoryById = await categoryRepository.findById(category_id, connection);

    if (!categoryById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    connection.release();

    return categoryById;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while retrieving category');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
};
