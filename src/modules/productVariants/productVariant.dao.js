/**
 * Performs the SQL query to get all product variants by product_id.
 *
 * @param {number} product_id The id of the product to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getByProductId(product_id, connection) {
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

  return connection.query(query, [product_id]);
}

/**
 * Performs the SQL query to get all attributes by variant_id.
 *
 * @param {number} variant_id The id of the variant to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getAttributesByVariantId(variant_id, connection) {
  const query = `SELECT
      a.name AS title,
      vav.value
      FROM variant_attribute_values vav
      LEFT JOIN attributes a ON vav.attribute_id = a.id
      LEFT JOIN variants v ON vav.variant_id = v.id
      WHERE v.id = ?`;

  return connection.query(query, [variant_id]);
}

module.exports = {
  getByProductId,
  getAttributesByVariantId,
};
