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
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
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
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?`;

  return connection.query(query, [product_id]);
}

/**
 * Performs the SQL query to get a product by its slug.
 *
 * @param {string} slug The slug of the product to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getBySlug(slug, connection) {
  const query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?`;

  return connection.query(query, [slug]);
}

/**
 * Performs the SQL query to get all product attributes by its id.
 *
 * @param {number} product_id The id of the product to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAttributesByProductId(product_id, connection) {
  const query = `SELECT
      a.id,
      a.title,
      pav.value
    FROM product_attribute_values pav
    LEFT JOIN products p ON pav.product_id = p.id
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
  const query = `SELECT
      pi.id,
      pi.url,
      pi.product_id,
      pi.variant_id
    FROM product_images pi
    LEFT JOIN products p ON pi.product_id = p.id
    LEFT JOIN variants v ON pi.variant_id = v.id
    WHERE p.id = ?`;

  return connection.query(query, [product_id]);
}

/**
 * Performs the SQL query to insert a product.
 *
 * @param {object} product The product to store.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function create(product, connection) {
  const query = 'INSERT INTO products SET ?';

  return connection.query(query, [product]);
}

module.exports = {
  getAll,
  getById,
  getBySlug,
  getAttributesByProductId,
  getImagesByProductId,
  create,
};
