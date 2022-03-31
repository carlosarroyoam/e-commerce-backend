/**
 * ProductVariantDao class.
 */
class ProductVariantDao {
  /**
   * ProductVariantDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get a variant by its product_id and
   * variant_id.
   *
   * @param {number} product_id The id of the product to query.
   * @param {number} variant_id The id of the variant to query.
   * @param {*} connection The database connection object.
   * @return {Promise} The query result.
   */
  async getById(product_id, variant_id, connection) {
    const query = `SELECT
      v.id,
      v.sku,
      v.price,
      v.compared_at_price,
      v.cost_per_item,
      v.quantity_on_stock,
      v.product_id
    FROM variants v
    LEFT JOIN products p ON v.product_id = p.id
    WHERE p.id = ?
    AND v.id = ?`;

    return this.connection.query(query, [product_id, variant_id]);
  }
  /**
   * Performs the SQL query to get all product variants by product_id.
   *
   * @param {number} product_id The id of the product to query.
   * @param {*} connection The database connection number.
   * @return {Promise} The query result.
   */
  async getByProductId(product_id, connection) {
    const query = `SELECT
      v.id,
      v.sku,
      v.price,
      v.compared_at_price,
      v.cost_per_item,
      v.quantity_on_stock,
      v.product_id
    FROM variants v
    LEFT JOIN products p ON v.product_id = p.id
    WHERE p.id = ?`;

    return this.connection.query(query, [product_id]);
  }

  /**
   * Performs the SQL query to get all attributes by variant_id.
   *
   * @param {number} variant_id The id of the variant to query.
   * @param {*} connection The database connection number.
   * @return {Promise} The query result.
   */
  async getAttributesByVariantId(variant_id, connection) {
    const query = `SELECT
      a.id,
      a.title,
      vav.value
      FROM variant_attribute_values vav
      LEFT JOIN variants v ON vav.variant_id = v.id
      LEFT JOIN attributes a ON vav.attribute_id = a.id
      WHERE v.id = ?`;

    return this.connection.query(query, [variant_id]);
  }
}

module.exports = ProductVariantDao;
