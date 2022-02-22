const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const attributeRepository = require('./attribute.repository');
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

    const categories = await attributeRepository.findAll(connection);

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

    const attributeById = await attributeRepository.findById(attribute_id, connection);

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

/**
 * Stores a attribute.
 *
 * @param {object} attribute The attribute to store.
 * @return {Promise} The created attribute.
 */
const store = async (attribute) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const attributeByTitle = await attributeRepository.findByTitle(attribute.title, connection);

    if (attributeByTitle) {
      throw new sharedErrors.UnprocessableEntityError({
        message: 'The request data is not valid',
        errors: {
          title: `The attribute: '${attribute.title}' already exists`,
        },
      });
    }

    const createdAttributeId = await attributeRepository.store(
      { title: attribute.title },
      connection
    );

    const createdAttribute = await attributeRepository.findById(createdAttributeId, connection);

    connection.release();

    return createdAttribute;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while storing attribute');
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  store,
};
