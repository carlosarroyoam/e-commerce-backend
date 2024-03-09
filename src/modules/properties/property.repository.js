import PropertyDao from '#modules/properties/property.dao.js';
import propertyMapper from '#modules/properties/property.mapper.js';

/**
 * PropertyRepository class.
 */
class PropertyRepository {
  /**
   * PropertyRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.propertyDao = new PropertyDao(this.connection);
  }

  /**
   * Retrieves all properties.
   *
   * @return {Promise} The result of the query.
   */
  async findAll() {
    const [result] = await this.propertyDao.getAll();

    return result;
  }

  /**
   * Retrieves a property by its id.
   *
   * @param {number} property_id The query options.
   * @return {Promise} The result of the query.
   */
  async findById(property_id) {
    const [[result]] = await this.propertyDao.getById(property_id);

    return result;
  }

  /**
   * Retrieves a property by its id.
   *
   * @param {number} title The query options.
   * @return {Promise} The result of the query.
   */
  async findByTitle(title) {
    const [[result]] = await this.propertyDao.getByTitle(title);

    return result;
  }

  /**
   * Stores a property.
   *
   * @param {object} property The property to store.
   * @return {Promise} The result of the query.
   */
  async store(property) {
    const propertyDbEntity = propertyMapper.toDatabaseEntity(property);

    const [result] = await this.propertyDao.create(propertyDbEntity);

    return result.insertId;
  }

  /**
   * Updates a property.
   *
   * @param {object} property The property to update.
   * @param {number} property_id The id of the property to update.
   * @return {Promise} The result of the query.
   */
  async update(property, property_id) {
    const propertyDbEntity = propertyMapper.toDatabaseEntity(property);

    const [result] = await this.propertyDao.update(propertyDbEntity, property_id);

    return result.changedRows;
  }

  /**
   * Deletes a property.
   *
   * @param {number} property_id The id of the property to delete.
   * @return {Promise} The result of the query.
   */
  async deleteById(property_id) {
    const [result] = await this.propertyDao.deleteById(property_id);

    return result.changedRows;
  }

  /**
   * Restores a property.
   *
   * @param {number} property_id The id of the property to restore.
   * @return {Promise} The result of the query
   */
  async restore(property_id) {
    const [result] = await this.propertyDao.restore(property_id);

    return result.changedRows;
  }
}

export default PropertyRepository;
