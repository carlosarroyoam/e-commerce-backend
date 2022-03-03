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

      throw new sharedErrors.InternalServerError({ message: 'Error while retrieving categories' });
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

      throw new sharedErrors.InternalServerError({ message: 'Error while retrieving category' });
    }

    throw err;
  }
};

/**
 * Stores a category.
 *
 * @param {object} category The category to store.
 * @return {Promise} The created category.
 */
const store = async (category) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categoryByTitle = await categoryRepository.findByTitle(category.title, connection);

    if (categoryByTitle) {
      throw new sharedErrors.UnprocessableEntityError({
        message: 'The request data is not valid',
        errors: {
          title: `The category: '${category.title}' already exists`,
        },
      });
    }

    const createdCategoryId = await categoryRepository.store({ title: category.title }, connection);

    const createdCategory = await categoryRepository.findById(createdCategoryId, connection);

    connection.release();

    return createdCategory;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while storing category' });
    }

    throw err;
  }
};

/**
 * Updates a category by its id.
 *
 * @param {number} category_id The id of the category to update.
 * @param {object} category The category to store.
 * @return {Promise} The created category.
 */
const update = async (category_id, category) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categoryById = await categoryRepository.findById(category_id, connection);

    if (!categoryById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    const categoryByTitle = await categoryRepository.findByTitle(category.title, connection);

    if (categoryByTitle && categoryByTitle.id !== category_id) {
      throw new sharedErrors.UnprocessableEntityError({
        message: 'The request data is not valid',
        errors: {
          title: `The category: '${category.title}' already exists`,
        },
      });
    }

    await categoryRepository.update({ title: category.title }, category_id, connection);

    const updatedCategory = await categoryRepository.findById(category_id, connection);

    connection.release();

    return updatedCategory;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while updating category' });
    }

    throw err;
  }
};

/**
 * Deletes an category by its id.
 *
 * @param {number} category_id The id of the category to delete.
 * @return {Promise} The id of the deleted category.
 */
const deleteById = async (category_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categoryById = await categoryRepository.findById(category_id, connection);

    if (!categoryById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    if (categoryById.deleted_at !== null) {
      throw new sharedErrors.BadRequestError({
        message: 'The category is already inactive',
      });
    }

    await categoryRepository.deleteById(category_id, connection);

    connection.release();

    return category_id;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while deleting category' });
    }

    throw err;
  }
};

/**
 * Restores a category by its id.
 *
 * @param {number} category_id The id of the category to restore.
 * @return {Promise} The id of the restored category.
 */
const restore = async (category_id) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const categoryById = await categoryRepository.findById(category_id, connection);

    if (!categoryById) {
      throw new sharedErrors.ResourceNotFoundError();
    }

    if (categoryById.deleted_at === null) {
      throw new sharedErrors.BadRequestError({
        message: 'The category is already active',
      });
    }

    await categoryRepository.restore(category_id, connection);

    connection.release();

    return category_id;
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new sharedErrors.InternalServerError({ message: 'Error while restoring category' });
    }

    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  store,
  update,
  deleteById,
  restore,
};
