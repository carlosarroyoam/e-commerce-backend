import AdminDao from '#modules/admins/admin.dao.js';
import adminMapper from '#modules/admins/admin.mapper.js';

/**
 * AdminRepository class.
 */
class AdminRepository {
	/**
	 * AdminRepository class constructor.
	 *
	 * @param {*} connection The database connection object.
	 */
	constructor(connection) {
		this.connection = connection;
		this.adminDao = new AdminDao(this.connection);
	}

	/**
	 * Retrieves all admin users.
	 *
	 * @param {object} queryOptions The query options.
	 * @param {number} queryOptions.skip The query skip.
	 * @param {number} queryOptions.limit The query limit.
	 * @param {string} queryOptions.sort The order for the results.
	 * @param {string} queryOptions.status The user status to query.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The result of the query.
	 */
	async findAll({ skip, limit, sort, status, search }) {
		const [result] = await this.adminDao.getAll({
			skip,
			limit,
			sort,
			status,
			search,
		});

		return result;
	}

	/**
	 * Retrieves an admin user by its id.
	 *
	 * @param {number} admin_id The id of the admin user to retrieve.
	 * @return {Promise} The result of the query.
	 */
	async findById(admin_id) {
		const [[result]] = await this.adminDao.getById(admin_id);

		return result;
	}

	/**
	 * Retrieves an admin user by its email.
	 *
	 * @param {string} email The email of the admin user to retrieve.
	 * @return {Promise} The result of the query.
	 */
	async findByEmail(email) {
		const [[result]] = await this.adminDao.getByEmail(email);

		return result;
	}

	/**
	 * Stores an admin user.
	 *
	 * @param {object} admin The admin user to store.
	 */
	async store(admin) {
		const userDbEntity = adminMapper.toDatabaseEntity(admin);

		const [result] = await this.adminDao.create(userDbEntity);

		return result.insertId;
	}

	/**
	 * Updates an admin user by its id.
	 *
	 * @param {object} admin The admin user to update.
	 * @param {number} admin_id The id of the admin user to update.
	 * @return {Promise} The result of the query.
	 */
	async update(admin, admin_id) {
		const userDbEntity = adminMapper.toDatabaseEntity(admin);

		const [result] = await this.adminDao.update(userDbEntity, admin_id);

		return result.changedRows;
	}
}

export default AdminRepository;
