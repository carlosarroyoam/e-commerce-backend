/**
 * AdminDao class.
 */
class AdminDao {
	/**
	 * AdminDao class constructor.
	 *
	 * @param {*} connection The database connection object.
	 */
	constructor(connection) {
		this.connection = connection;
	}

	/**
	 * Performs the SQL query to get all admin users.
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
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
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
	 * Performs the SQL query to get a non-deleted/active admin user by its id.
	 *
	 * @param {number} admin_id The id of the admin user to query.
	 * @return {Promise} The query result.
	 */
	async getById(admin_id) {
		const query = `SELECT
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
    WHERE adm.id = ?`;

		return this.connection.query(query, [admin_id]);
	}

	/**
	 * Performs the SQL query to get a non-deleted/active admin user by its email address.
	 *
	 * @param {string} email The email of the admin user to query.
	 * @return {Promise} The query result.
	 */
	async getByEmail(email) {
		const query = `SELECT
        adm.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        adm.is_super,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM admins adm
    LEFT JOIN users usr ON adm.user_id = usr.id
    WHERE usr.email = ?`;

		return this.connection.query(query, [email]);
	}

	/**
	 * Performs the SQL query to insert an admin user.
	 *
	 * @param {object} admin The admin user to store.
	 * @return {Promise} The query result.
	 */
	async create(admin) {
		const query = 'INSERT INTO admins SET ?';

		return this.connection.query(query, [admin]);
	}

	/**
	 * Performs the SQL query to update an admin user.
	 *
	 * @param {object} admin The admin user to update.
	 * @param {number} admin_id The id of the admin user to update.
	 * @return {Promise} The query result.
	 */
	async update(admin, admin_id) {
		const query = 'UPDATE admins SET ? WHERE id = ? LIMIT 1';

		return this.connection.query(query, [admin, admin_id]);
	}
}

module.exports = AdminDao;
