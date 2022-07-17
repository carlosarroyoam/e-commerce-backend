const dbConnectionPool = require('../../common/lib/mysql/connectionPool');
const AttributeRepository = require('./attribute.repository');
const sharedErrors = require('../../common/errors');
const logger = require('../../common/lib/winston/logger');

/**
 * AttributeService class.
 */
class AttributeService {
  /**
   * Retrieves all product attributes.
   *
   * @return {Promise} The list of products.
   */
  async findAll() {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const attributeRepository = new AttributeRepository(connection);

      const attributes = await attributeRepository.findAll();

      connection.release();

      return attributes;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while retrieving attributes');
      }

      throw err;
    }
  }

  /**
   * Retrieves an attribute by its id.
   *
   * @param {number} attribute_id The id of the attribute to retrieve.
   * @return {Promise} The variant.
   */
  async findById(attribute_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const attributeRepository = new AttributeRepository(connection);

      const attributeById = await attributeRepository.findById(attribute_id);

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

        throw new sharedErrors.InternalServerError('Error while retrieving attribute');
      }

      throw err;
    }
  }

  /**
   * Stores an attribute.
   *
   * @param {object} attribute The attribute to store.
   * @return {Promise} The created attribute.
   */
  async store(attribute) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const attributeRepository = new AttributeRepository(connection);

      const attributeByTitle = await attributeRepository.findByTitle(attribute.title);

      if (attributeByTitle) {
        throw new sharedErrors.UnprocessableEntityError({
          message: 'The request data is not valid',
          errors: {
            title: `The attribute: '${attribute.title}' already exists`,
          },
        });
      }

      const createdAttributeId = await attributeRepository.store({
        title: attribute.title,
      });

      const createdAttribute = await attributeRepository.findById(createdAttributeId);

      connection.release();

      return createdAttribute;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while storing attribute');
      }

      throw err;
    }
  }

  /**
   * Updates an attribute.
   *
   * @param {number} attribute_id The id of the attribute to delete.
   * @param {object} attribute The attribute to update.
   * @return {Promise} The created attribute.
   */
  async update(attribute_id, attribute) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const attributeRepository = new AttributeRepository(connection);

      const attributeByTitle = await attributeRepository.findById(attribute_id);

      if (!attributeByTitle) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      await attributeRepository.update({ title: attribute.title }, attribute_id);

      const updatedAttribute = await attributeRepository.findById(attribute_id);

      connection.release();

      return updatedAttribute;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while updating attribute');
      }

      throw err;
    }
  }

  /**
   * Deletes an attribute by its id.
   *
   * @param {number} attribute_id The id of the attribute to delete.
   * @return {Promise} The id of the deleted attribute.
   */
  async deleteById(attribute_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const attributeRepository = new AttributeRepository(connection);

      const attributeById = await attributeRepository.findById(attribute_id);

      if (!attributeById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      if (attributeById.deleted_at !== null) {
        throw new sharedErrors.BadRequestError('The attribute is already inactive');
      }

      await attributeRepository.deleteById(attribute_id);

      connection.release();

      return attribute_id;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while deleting attribute');
      }

      throw err;
    }
  }

  /**
   * Restores a attribute by its id.
   *
   * @param {number} attribute_id The id of the attribute to restore.
   * @return {Promise} The id of the restored attribute.
   */
  async restore(attribute_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const attributeRepository = new AttributeRepository(connection);

      const attributeById = await attributeRepository.findById(attribute_id);

      if (!attributeById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      if (attributeById.deleted_at === null) {
        throw new sharedErrors.BadRequestError('The attribute is already active');
      }

      await attributeRepository.restore(attribute_id);

      connection.release();

      return attribute_id;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while restoring attribute');
      }

      throw err;
    }
  }
}

module.exports = new AttributeService();
