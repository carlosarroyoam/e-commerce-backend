/**
 * Performs the SQL query to get all attributes.
 *
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAllByProductId(connection) {
  const query = `SELECT
      id,
      title
    FROM attributes`;

  return connection.query(query);
}
/**
 * Performs the SQL query to get a attribute by its id.
 *
 * @param {number} attribute_id The id of the attribute to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getById(attribute_id, connection) {
  const query = `SELECT
      id,
      title,
      deleted_at
    FROM attributes
    WHERE id = ?`;

  return connection.query(query, [attribute_id]);
}

/**
 * Performs the SQL query to get a category by its title.
 *
 * @param {number} title The title of the category to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getByTitle(title, connection) {
  const query = `SELECT
      id,
      title,
      deleted_at
    FROM attributes
    WHERE title = ?`;

  return connection.query(query, [title]);
}

/**
 * Performs the SQL query to insert a attribute.
 *
 * @param {object} attribute The attribute to store.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function create(attribute, connection) {
  const query = 'INSERT INTO attributes SET ?';

  return connection.query(query, [attribute]);
}

/**
 * Performs the SQL query to delete a attribute.
 *
 * @param {number} attribute_id The id of the attribute to delete.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function deleteById(attribute_id, connection) {
  const query = 'UPDATE attributes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

  return connection.query(query, [attribute_id]);
}

/**
 * Performs the SQL query to restore a attribute.
 *
 * @param {number} attribute_id The id of the attribute to restore.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function restore(attribute_id, connection) {
  const query = 'UPDATE attributes SET deleted_at = NULL WHERE id = ? LIMIT 1';

  return connection.query(query, [attribute_id]);
}

module.exports = {
  getAllByProductId,
  getById,
  getByTitle,
  create,
  deleteById,
  restore,
};
