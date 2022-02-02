/**
 * Performs the SQL query to get all categories.
 *
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAll({ skip = 0, limit = 50, sort = 'id' }, connection) {
  let query = `SELECT
      id,
      title
    FROM categories`;

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
 * Performs the SQL query to get a category by its id.
 *
 * @param {number} category_id The id of the category to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getById(category_id, connection) {
  const query = `SELECT
      id,
      title
    FROM categories
    WHERE id = ?`;

  return connection.query(query, [category_id]);
}

module.exports = {
  getAll,
  getById,
};
