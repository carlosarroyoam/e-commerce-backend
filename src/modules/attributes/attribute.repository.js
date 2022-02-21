const attributeDao = require('./attribute.dao');

/**
 * Retrieves all attributes.
 *
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findAll = async (connection) => {
  const [result] = await attributeDao.getAllByProductId(connection);

  return result;
};

/**
 * Retrieves a attribute by its id.
 *
 * @param {number} attribute_id The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findById = async (attribute_id, connection) => {
  const [[result]] = await attributeDao.getById(attribute_id, connection);

  return result;
};

module.exports = {
  findAll,
  findById,
};
