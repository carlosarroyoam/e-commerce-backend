const attributeDao = require('./attribute.dao');
const attributeMapper = require('./attribute.mapper');

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

/**
 * Retrieves a attribute by its id.
 *
 * @param {number} title The query options.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query.
 */
const findByTitle = async (title, connection) => {
  const [[result]] = await attributeDao.getByTitle(title, connection);

  return result;
};

/**
 * Stores a attribute.
 *
 * @param {object} attribute The attribute to store.
 * @param {any} connection The database connection object.
 */
const store = async (attribute, connection) => {
  const attributeDbEntity = attributeMapper.toDatabaseEntity(attribute);

  const [result] = await attributeDao.create(attributeDbEntity, connection);

  return result.insertId;
};

/**
 * Deletes a attribute.
 *
 * @param {number} attribute_id The id of the attribute to delete.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const deleteById = async (attribute_id, connection) => {
  const [result] = await attributeDao.deleteById(attribute_id, connection);

  return result.changedRows;
};

/**
 * Restores a attribute.
 *
 * @param {number} attribute_id The id of the attribute to restore.
 * @param {any} connection The database connection object.
 * @return {Promise} The result of the query
 */
const restore = async (attribute_id, connection) => {
  const [result] = await attributeDao.restore(attribute_id, connection);

  return result.changedRows;
};

module.exports = {
  findAll,
  findById,
  findByTitle,
  store,
  deleteById,
  restore,
};
