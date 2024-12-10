import ProductDao from '#modules/products/product.dao.js';
import productMapper from '#modules/products/product.mapper.js';

/**
 * ProductRepository class.
 */
class ProductRepository {
  /**
   * ProductVariantRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.productDao = new ProductDao(this.connection);
  }

  /**
   * Retrieves all products.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The result of the query.
   */
  async findAll({ page, size, sort, search }) {
    const [result] = await this.productDao.getAll({
      page,
      size,
      sort,
      search,
    });

    return result;
  }

  /**
   * Retrieves the products count.
   *
   * @param {object} queryOptions The query options.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The result of the query
   */
  async count({ search }) {
    const [[{ count: result }]] = await this.productDao.count({ search });

    return result;
  }

  /**
   * Retrieves a product by its id.
   *
   * @param {number} product_id The id of the product to retrieve.
   * @return {Promise} The result of the query.
   */
  async findById(product_id) {
    const [[result]] = await this.productDao.getById(product_id);

    return result;
  }

  /**
   * Retrieves a product by its slug.
   *
   * @param {string} slug The slug of the product to retrieve.
   * @return {Promise} The result of the query.
   */
  async findBySlug(slug) {
    const [[result]] = await this.productDao.getBySlug(slug);

    return result;
  }

  /**
   * Retrieves all product attributes by product_id.
   *
   * @param {number} product_id The query options.
   * @return {Promise} The result of the query.
   */
  async findPropertiesByProductId(product_id) {
    const [result] = await this.productDao.findPropertiesByProductId(product_id);

    return result;
  }

  /**
   * Stores a product.
   *
   * @param {object} product The product to store.
   */
  async store(product) {
    const productDbEntity = productMapper.toDatabaseEntity(product);

    const [result] = await this.productDao.create(productDbEntity);

    return result.insertId;
  }
}
export default ProductRepository;
