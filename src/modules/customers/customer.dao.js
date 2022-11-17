/**
 * CustomerDao class.
 */
class CustomerDao {
	/**
	 * CustomerDao class constructor.
	 *
	 * @param {*} connection The database connection object.
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
	 * @param {string} queryOptions.status The user status to query.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The query result.
	 */
	async getAll({ skip = 0, limit = 50, sort = 'id', status, search }) {
		let query = `SELECT
        cus.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM customers cus
    LEFT JOIN users usr ON cus.user_id = usr.id
    WHERE 1`;

		if (status) {
			if (status === 'active') {
				query += ' AND usr.deleted_at IS NULL';
			} else {
				query += ' AND usr.deleted_at IS NOT NULL';
			}
		}

		if (search) {
			query += ` AND MATCH(first_name, last_name) AGAINST("${this.connection.escape(
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
	 * Performs the SQL query to get a customer user by its id.
	 *
	 * @param {number} customer_id The id of the customer user to query.
	 * @return {Promise} The query result.
	 */
	async getById(customer_id) {
		const query = `SELECT
        cus.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM customers cus
    LEFT JOIN users usr ON cus.user_id = usr.id
    WHERE cus.id = ?`;

		return this.connection.query(query, [customer_id]);
	}

	/**
	 * Performs the SQL query to get a customer user by its email address.
	 *
	 * @param {string} email The email of the customer user to query.
	 * @return {Promise} The query result.
	 */
	async getByEmail(email) {
		const query = `SELECT
        cus.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM customers cus
    LEFT JOIN users usr ON cus.user_id = usr.id
    WHERE usr.email = ?`;

		return this.connection.query(query, [email]);
	}

	/**
	 * Performs the SQL query to insert a customer user.
	 *
	 * @param {object} customer The customer user to store.
	 * @return {Promise} The query result.
	 */
	async create(customer) {
		const query = 'INSERT INTO customers SET ?';

		return this.connection.query(query, [customer]);
	}

	/**
	 * Performs the SQL query to update a customer user.
	 *
	 * @param {object} customer The customer user to update.
	 * @param {number} customer_id The id of the customer user to update.
	 * @return {Promise} The query result.
	 */
	async update(customer, customer_id) {
		const query = 'UPDATE customers SET ? WHERE id = ? LIMIT 1';

		return this.connection.query(query, [customer, customer_id]);
	}
}

module.exports = CustomerDao;
