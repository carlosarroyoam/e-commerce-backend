/**
 * PropertyDao class.
 */
class PropertyDao {
	/**
	 * PropertyDao class constructor.
	 *
	 * @param {*} connection The database connection object.
	 */
	constructor(connection) {
		this.connection = connection;
	}

	/**
	 * Performs the SQL query to get all properties.
	 *
	 * @return {Promise} The query result.
	 */
	async getAll() {
		const query = `SELECT
      id,
      title,
      deleted_at
    FROM properties`;

		return this.connection.query(query);
	}
	/**
	 * Performs the SQL query to get a property by its id.
	 *
	 * @param {number} property_id The id of the property to query.
	 * @return {Promise} The query result.
	 */
	async getById(property_id) {
		const query = `SELECT
      id,
      title,
      deleted_at
    FROM properties
    WHERE id = ?`;

		return this.connection.query(query, [property_id]);
	}

	/**
	 * Performs the SQL query to get a category by its title.
	 *
	 * @param {number} title The title of the category to query.
	 * @return {Promise} The query result.
	 */
	async getByTitle(title) {
		const query = `SELECT
      id,
      title,
      deleted_at
    FROM properties
    WHERE title = ?`;

		return this.connection.query(query, [title]);
	}

	/**
	 * Performs the SQL query to insert a property.
	 *
	 * @param {object} property The property to store.
	 * @return {Promise} The query result.
	 */
	async create(property) {
		const query = 'INSERT INTO properties SET ?';

		return this.connection.query(query, [property]);
	}

	/**
	 * Performs the SQL query to update a property.
	 *
	 * @param {object} property The property to update.
	 * @param {number} property_id The id of the property to update.
	 * @return {Promise} The query result.
	 */
	async update(property, property_id) {
		const query = 'UPDATE properties SET ? WHERE id = ? LIMIT 1';

		return this.connection.query(query, [property, property_id]);
	}

	/**
	 * Performs the SQL query to delete a property.
	 *
	 * @param {number} property_id The id of the property to delete.
	 * @return {Promise} The query result.
	 */
	async deleteById(property_id) {
		const query = 'UPDATE properties SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

		return this.connection.query(query, [property_id]);
	}

	/**
	 * Performs the SQL query to restore a property.
	 *
	 * @param {number} property_id The id of the property to restore.
	 * @return {Promise} The query result.
	 */
	async restore(property_id) {
		const query = 'UPDATE properties SET deleted_at = NULL WHERE id = ? LIMIT 1';

		return this.connection.query(query, [property_id]);
	}
}

export default PropertyDao;
