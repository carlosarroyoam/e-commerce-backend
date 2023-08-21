/**
 * CategoryDao class.
 */
class CategoryDao {
	/**
	 * CategoryDao class constructor.
	 *
	 * @param {*} connection The database connection object.
	 */
	constructor(connection) {
		this.connection = connection;
	}

	/**
	 * Performs the SQL query to get all categories.
	 *
	 * @return {Promise} The query result.
	 */
	async getAll({ skip = 0, limit = 50, sort = 'id' }) {
		let query = `SELECT
      id,
      title,
      deleted_at
    FROM categories`;

		if (sort) {
			let order = 'ASC';

			if (sort.charAt(0) === '-') {
				order = 'DESC';
				sort = sort.substring(1);
			}

			query += ` ORDER BY ${this.connection.escapeId(sort)} ${order}`;
		}

		query += ` LIMIT ${this.connection.escape(skip)}, ${this.connection.escape(limit)}`;

		return this.connection.query(query);
	}

	/**
	 * Performs the SQL query to get a category by its id.
	 *
	 * @param {number} category_id The id of the category to query.
	 * @return {Promise} The query result.
	 */
	async getById(category_id) {
		const query = `SELECT
      id,
      title,
      deleted_at
    FROM categories
    WHERE id = ?`;

		return this.connection.query(query, [category_id]);
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
    FROM categories
    WHERE title = ?`;

		return this.connection.query(query, [title]);
	}

	/**
	 * Performs the SQL query to insert a category.
	 *
	 * @param {object} category The category to store.
	 * @return {Promise} The query result.
	 */
	async create(category) {
		const query = 'INSERT INTO categories SET ?';

		return this.connection.query(query, [category]);
	}

	/**
	 * Performs the SQL query to update a category.
	 *
	 * @param {object} category The category to update.
	 * @param {number} category_id The id of the category.
	 * @return {Promise} The query result.
	 */
	async update(category, category_id) {
		const query = 'UPDATE categories SET ? WHERE id = ? LIMIT 1';

		return this.connection.query(query, [category, category_id]);
	}

	/**
	 * Performs the SQL query to delete a category.
	 *
	 * @param {number} category_id The id of the category to delete.
	 * @return {Promise} The query result.
	 */
	async deleteById(category_id) {
		const query = 'UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

		return this.connection.query(query, [category_id]);
	}

	/**
	 * Performs the SQL query to restore a category.
	 *
	 * @param {number} category_id The id of the category to restore.
	 * @return {Promise} The query result.
	 */
	async restore(category_id) {
		const query = 'UPDATE categories SET deleted_at = NULL WHERE id = ? LIMIT 1';

		return this.connection.query(query, [category_id]);
	}
}

export default CategoryDao;
