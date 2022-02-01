/**
 * Performs the SQL query to get all customer users.
 *
 * @param {object} queryOptions The query options.
 * @param {number} queryOptions.skip The query skip.
 * @param {number} queryOptions.limit The query limit.
 * @param {string} queryOptions.sort The order for the results.
 * @param {string} queryOptions.search The search criteria.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAll({ skip = 0, limit = 50, sort = 'id', search }, connection) {
  let query = `SELECT
      id,
      title,
      slug,
      description,
      featured,
      status,
      created_at,
      updated_at,
      deleted_at
    FROM products
    WHERE 1`;

  if (search) {
    query += ` AND MATCH(title, description) AGAINST("${connection.escape(
      search
    )}*" IN BOOLEAN MODE)`;
  }

  if (sort) {
    let order = 'ASC';

    if (sort.charAt(0) === '-') {
      order = 'DESC';
      sort = sort.substring(1);
    }

    query += ` ORDER BY ${connection.escapeId(sort)} ${order}`;
  }

  query += ` LIMIT ${connection.escape(skip)}, ${connection.escape(limit)}`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a product by its id.
 *
 * @param {number} product_id The id of the product to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getById(product_id, connection) {
  const query = `SELECT
      id,
      title,
      slug,
      description,
      featured,
      status,
      created_at,
      updated_at,
      deleted_at
    FROM products
    WHERE id = ?`;

  return connection.query(query, [product_id]);
}

/**
 * Performs the SQL query to get all product attributes by its id.
 *
 * @param {number} product_id The id of the product to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAttributesByProductId(product_id, connection) {
  const query = `SELECT a.name AS title, pav.value FROM products p
      LEFT JOIN product_attribute_values pav ON p.id = pav.product_id
      LEFT JOIN attributes a ON pav.attribute_id = a.id
      WHERE p.id =  ?`;

  return connection.query(query, [product_id]);
}

/**
 * Performs the SQL query to get all product images by its id.
 *
 * @param {number} product_id The id of the product to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getImagesByProductId(product_id, connection) {
  const query = `SELECT 1 AS id, 'motog100' AS url`;

  return connection.query(query, [product_id]);
}

module.exports = {
  getAll,
  getById,
  getAttributesByProductId,
  getImagesByProductId,
};
