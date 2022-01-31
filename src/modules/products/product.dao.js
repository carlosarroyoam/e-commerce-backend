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

module.exports = {
  getAll,
};
