import CategoryDao from '#features/categories/category.dao.js';
import categoryMapper from '#features/categories/category.mapper.js';

/**
 * CategoryRepository class.
 */
class CategoryRepository {
  /**
   * CategoryRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.categoryDao = new CategoryDao(this.connection);
  }

  /**
   * Retrieves all categories.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @return {Promise} The result of the query.
   */
  async findAll({ page, size, sort }) {
    const [result] = await this.categoryDao.getAll({ page, size, sort });

    return result;
  }

  /**
   * Retrieves the categories count.
   *
   * @return {Promise} The result of the query.
   */
  async count() {
    const [[{ count: result }]] = await this.categoryDao.count();

    return result;
  }

  /**
   * Retrieves a category by its id.
   *
   * @param {number} category_id The query options.
   * @return {Promise} The result of the query.
   */
  async findById(category_id) {
    const [[result]] = await this.categoryDao.getById(category_id);

    return result;
  }

  /**
   * Retrieves a category by its title.
   *
   * @param {number} title The query options.
   * @return {Promise} The result of the query.
   */
  async findByTitle(title) {
    const [[result]] = await this.categoryDao.getByTitle(title);

    return result;
  }

  /**
   * Stores a category.
   *
   * @param {object} category The category to store.
   * @return {Promise} The result of the query.
   */
  async store(category) {
    const categoryDbEntity = categoryMapper.toDatabaseEntity(category);

    const [result] = await this.categoryDao.create(categoryDbEntity);

    return result.insertId;
  }

  /**
   * Updates a category by its id.
   *
   * @param {object} customer The category to update.
   * @param {number} category_id The id of the category.
   * @return {Promise} The result of the query.
   */
  async update(customer, category_id) {
    const categoryDbEntity = categoryMapper.toDatabaseEntity(customer);

    const [result] = await this.categoryDao.update(categoryDbEntity, category_id);

    return result.changedRows;
  }

  /**
   * Deletes a category.
   *
   * @param {number} category_id The id of the category to delete.
   * @return {Promise} The result of the query.
   */
  async deleteById(category_id) {
    const [result] = await this.categoryDao.deleteById(category_id);

    return result.changedRows;
  }

  /**
   * Restores a category.
   *
   * @param {number} category_id The id of the category to restore.
   * @return {Promise} The result of the query.
   */
  async restore(category_id) {
    const [result] = await this.categoryDao.restore(category_id);

    return result.changedRows;
  }
}

export default CategoryRepository;
