const ProductVariantDao = require('./productVariant.dao');

/**
 * ProductVariantRepository class.
 */
class ProductVariantRepository {
  /**
   * ProductVariantRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.productVariantDao = new ProductVariantDao(this.connection);
  }

  /**
   * Retrieves product variant by its id.
   *
   * @param {number} product_id The id of the product.
   * @param {number} variant_id The id of the variant.
   * @return {Promise} The result of the query.
   */
  async findById(product_id, variant_id) {
    const [[result]] = await this.productVariantDao.getById(product_id, variant_id);

    return result;
  }

  /**
   * Retrieves all product variants by product_id.
   *
   * @param {number} product_id The query options.
   * @return {Promise} The result of the query.
   */
  async findByProductId(product_id) {
    const [result] = await this.productVariantDao.getByProductId(product_id);

    return result;
  }

  /**
   * Retrieves all product attributes by product_id.
   *
   * @param {number} variant_id The query options.
   * @return {Promise} The result of the query.
   */
  async findAttributesByVariantId(variant_id) {
    const [result] = await this.productVariantDao.getAttributesByVariantId(variant_id);

    return result;
  }
}

module.exports = ProductVariantRepository;
