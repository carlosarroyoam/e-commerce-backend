import AttributeDao from './attribute.dao.js';
import attributeMapper from './attribute.mapper.js';

/**
 * AttributeRepository class.
 */
class AttributeRepository {
	/**
	 * AttributeRepository class constructor.
	 *
	 * @param {*} connection The database connection object.
	 */
	constructor(connection) {
		this.connection = connection;
		this.attributeDao = new AttributeDao(this.connection);
	}

	/**
	 * Retrieves all attributes.
	 *
	 * @return {Promise} The result of the query.
	 */
	async findAll() {
		const [result] = await this.attributeDao.getAllByProductId();

		return result;
	}

	/**
	 * Retrieves a attribute by its id.
	 *
	 * @param {number} attribute_id The query options.
	 * @return {Promise} The result of the query.
	 */
	async findById(attribute_id) {
		const [[result]] = await this.attributeDao.getById(attribute_id);

		return result;
	}

	/**
	 * Retrieves a attribute by its id.
	 *
	 * @param {number} title The query options.
	 * @return {Promise} The result of the query.
	 */
	async findByTitle(title) {
		const [[result]] = await this.attributeDao.getByTitle(title);

		return result;
	}

	/**
	 * Stores a attribute.
	 *
	 * @param {object} attribute The attribute to store.
	 * @return {Promise} The result of the query.
	 */
	async store(attribute) {
		const attributeDbEntity = attributeMapper.toDatabaseEntity(attribute);

		const [result] = await this.attributeDao.create(attributeDbEntity);

		return result.insertId;
	}

	/**
	 * Updates a attribute.
	 *
	 * @param {object} attribute The attribute to update.
	 * @param {number} attribute_id The id of the attribute to update.
	 * @return {Promise} The result of the query.
	 */
	async update(attribute, attribute_id) {
		const attributeDbEntity = attributeMapper.toDatabaseEntity(attribute);

		const [result] = await this.attributeDao.update(attributeDbEntity, attribute_id);

		return result.changedRows;
	}

	/**
	 * Deletes a attribute.
	 *
	 * @param {number} attribute_id The id of the attribute to delete.
	 * @return {Promise} The result of the query.
	 */
	async deleteById(attribute_id) {
		const [result] = await this.attributeDao.deleteById(attribute_id);

		return result.changedRows;
	}

	/**
	 * Restores a attribute.
	 *
	 * @param {number} attribute_id The id of the attribute to restore.
	 * @return {Promise} The result of the query
	 */
	async restore(attribute_id) {
		const [result] = await this.attributeDao.restore(attribute_id);

		return result.changedRows;
	}
}

export default AttributeRepository;
