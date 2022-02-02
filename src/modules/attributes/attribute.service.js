const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const categoryRepository = require('./attribute.repository');
const sharedErrors = require('../../shared/errors');
const logger = require('../../shared/lib/winston/logger');

/**
 * Retrieves all product attributes.
 *
 * @return {Promise} The list of products.
 */
const findAll = async () => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categories = await categoryRepository.findAll(connection);

    connection.release();

    return categories;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving attrubutes');
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

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while retrieving attribute');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
};
