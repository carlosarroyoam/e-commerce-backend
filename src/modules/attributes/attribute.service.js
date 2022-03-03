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

      throw new sharedErrors.InternalServerError({ message: 'Error while retrieving attributes' });
    }

    throw err;
  }
};

/**
 * Retrieves an attribute by its id.
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

      throw new sharedErrors.InternalServerError({ message: 'Error while retrieving attribute' });
    }

    throw err;
  }
};

/**
 * Stores an attribute.
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

      throw new sharedErrors.InternalServerError({ message: 'Error while storing attribute' });
    }

    throw err;
  }
};

/**
 * Deletes an attribute by its id.
 *
 * @param {number} attribute_id The id of the attribute to delete.
 * @return {Promise} The id of the deleted attribute.
 */
const deleteById = async (attribute_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const attributeById = await attributeRepository.findById(attribute_id, connection);

    if (!attributeById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    if (attributeById.deleted_at !== null) {
      throw new sharedErrors.BadRequestError({
        message: 'The attribute is already inactive',
      });
    }

    await attributeRepository.deleteById(attribute_id, connection);

    connection.release();

    return attribute_id;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while deleting attribute' });
    }

    throw err;
  }
};

/**
 * Restores a attribute by its id.
 *
 * @param {number} attribute_id The id of the attribute to restore.
 * @return {Promise} The id of the restored attribute.
 */
const restore = async (attribute_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const attributeById = await attributeRepository.findById(attribute_id, connection);

    if (!attributeById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    if (attributeById.deleted_at === null) {
      throw new sharedErrors.BadRequestError({
        message: 'The attribute is already active',
      });
    }

    await attributeRepository.restore(attribute_id, connection);

    connection.release();

    return attribute_id;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while restoring attribute' });
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  store,
  deleteById,
  restore,
};
