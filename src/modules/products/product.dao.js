/**
 * ProductDao class.
 */
class ProductDao {
	/**
	 * ProductDao class constructor.
	 *
	 */
	constructor(connection) {
		this.connection = connection;
	}

	/**
	 * Performs the SQL query to get all customer users.
	 *
	 * @param {object} queryOptions The query options.
	 * @param {number} queryOptions.skip The query skip.
	 * @param {number} queryOptions.limit The query limit.
	 * @param {string} queryOptions.sort The order for the results.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The query result.
	 */
	async getAll({ skip = 0, limit = 50, sort = 'id', search }) {
		let query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1`;

		if (search) {
			query += ` AND MATCH(title, description) AGAINST("${this.connection.escape(
				search
			)}*" IN BOOLEAN MODE)`;
		}

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
	 * Performs the SQL query to get a product by its id.
	 *
	 * @param {number} product_id The id of the product to query.
	 * @return {Promise} The query result.
	 */
	async getById(product_id) {
		const query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?`;

		return this.connection.query(query, [product_id]);
	}

	/**
	 * Performs the SQL query to get a product by its slug.
	 *
	 * @param {string} slug The slug of the product to query.
	 * @return {Promise} The query result.
	 */
	async getBySlug(slug) {
		const query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?`;

		return this.connection.query(query, [slug]);
	}

	/**
	 * Performs the SQL query to get all product attributes by its id.
	 *
	 * @param {number} product_id The id of the product to query.
	 * @return {Promise} The query result.
	 */
	async getAttributesByProductId(product_id) {
		const query = `SELECT
      a.id,
      a.title,
      pav.value
    FROM product_attribute_values pav
    LEFT JOIN products p ON pav.product_id = p.id
    LEFT JOIN attributes a ON pav.attribute_id = a.id
    WHERE p.id =  ?`;

		return this.connection.query(query, [product_id]);
	}

	/**
	 * Performs the SQL query to insert a product.
	 *
	 * @param {object} product The product to store.
	 * @return {Promise} The query result.
	 */
	async create(product) {
		const query = 'INSERT INTO products SET ?';

		return this.connection.query(query, [product]);
	}
}

module.exports = ProductDao;
