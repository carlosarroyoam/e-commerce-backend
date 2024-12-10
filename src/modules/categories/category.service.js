import CategoryRepository from '#modules/categories/category.repository.js';

import sharedErrors from '#common/errors/index.js';
import dbConnectionPool from '#common/lib/mysql/connectionPool.js';
import logger from '#common/lib/winston/logger.js';

/**
 * CategoryService class.
 */
class CategoryService {
  /**
   * Retrieves all product variants.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @return {Promise} The list of products.
   */
  async findAll({ page = 1, size = 50, sort = 'id' }) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const categoryRepository = new CategoryRepository(connection);

      const totalCategories = await categoryRepository.count();
      const categories = await categoryRepository.findAll({
        page,
        size,
        sort,
      });

      connection.release();

      return {
        categories,
        page: {
          page,
          size,
          totalElements: totalCategories,
          totalPages: Math.ceil(totalCategories / size),
        },
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while retrieving categories');
      }

      throw err;
    }
  }

  /**
   * Retrieves a category by its id.
   *
   * @param {number} category_id The id of the category to retrieve.
   * @return {Promise} The variant.
   */
  async findById(category_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const categoryRepository = new CategoryRepository(connection);

      const categoryById = await categoryRepository.findById(category_id);

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

        throw new sharedErrors.InternalServerError('Error while retrieving category');
      }

      throw err;
    }
  }

  /**
   * Stores a category.
   *
   * @param {object} category The category to store.
   * @return {Promise} The created category.
   */
  async store(category) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const categoryRepository = new CategoryRepository(connection);

      const categoryByTitle = await categoryRepository.findByTitle(category.title);

      if (categoryByTitle) {
        throw new sharedErrors.UnprocessableEntityError({
          message: 'The request data is not valid',
          errors: {
            title: `The category: '${category.title}' already exists`,
          },
        });
      }

      const createdCategoryId = await categoryRepository.store({
        title: category.title,
      });

      const createdCategory = await categoryRepository.findById(createdCategoryId);

      connection.release();

      return createdCategory;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while storing category');
      }

      throw err;
    }
  }

  /**
   * Updates a category by its id.
   *
   * @param {number} category_id The id of the category to update.
   * @param {object} category The category to store.
   * @return {Promise} The created category.
   */
  async update(category_id, category) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const categoryRepository = new CategoryRepository(connection);

      const categoryById = await categoryRepository.findById(category_id);

      if (!categoryById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const categoryByTitle = await categoryRepository.findByTitle(category.title);

      if (categoryByTitle && categoryByTitle.id !== category_id) {
        throw new sharedErrors.UnprocessableEntityError({
          message: 'The request data is not valid',
          errors: {
            title: `The category: '${category.title}' already exists`,
          },
        });
      }

      await categoryRepository.update({ title: category.title }, category_id);

      const updatedCategory = await categoryRepository.findById(category_id);

      connection.release();

      return updatedCategory;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while updating category');
      }

      throw err;
    }
  }

  /**
   * Deletes an category by its id.
   *
   * @param {number} category_id The id of the category to delete.
   * @return {Promise} The id of the deleted category.
   */
  async deleteById(category_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const categoryRepository = new CategoryRepository(connection);

      const categoryById = await categoryRepository.findById(category_id);

      if (!categoryById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      if (categoryById.deleted_at !== null) {
        throw new sharedErrors.BadRequestError('The category is already inactive');
      }

      await categoryRepository.deleteById(category_id);

      connection.release();

      return category_id;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while deleting category');
      }

      throw err;
    }
  }

  /**
   * Restores a category by its id.
   *
   * @param {number} category_id The id of the category to restore.
   * @return {Promise} The id of the restored category.
   */
  async restore(category_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const categoryRepository = new CategoryRepository(connection);

      const categoryById = await categoryRepository.findById(category_id);

      if (!categoryById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      if (categoryById.deleted_at === null) {
        throw new sharedErrors.BadRequestError('The category is already active');
      }

      await categoryRepository.restore(category_id);

      connection.release();

      return category_id;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({
          message: err.message,
        });

        throw new sharedErrors.InternalServerError('Error while restoring category');
      }

      throw err;
    }
  }
}

export default new CategoryService();
