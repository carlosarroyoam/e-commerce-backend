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

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while retrieving attributes');
    }

    throw err;
  }
};

/**
 * Retrieves a attribute by its id.
 *
 * @param {number} attribute_id The id of the attribute to retrieve.
 * @return {Promise} The variant.
 */
const findById = async (attribute_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const attributeById = await categoryRepository.findById(attribute_id, connection);

    if (!attributeById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    connection.release();

    return attributeById;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
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
