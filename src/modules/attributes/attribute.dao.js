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
      title
    FROM attributes
    WHERE id = ?`;

  return connection.query(query, [attribute_id]);
}

module.exports = {
  getAllByProductId,
  getById,
};
