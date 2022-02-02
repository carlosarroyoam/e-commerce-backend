/**
 * Performs the SQL query to get all categories.
 *
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAll(connection) {
  const query = `SELECT
      id,
      title
    FROM categories`;

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
