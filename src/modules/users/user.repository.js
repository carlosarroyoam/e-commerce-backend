import UserDao from '#modules/users/user.dao.js';
import userMapper from '#modules/users/user.mapper.js';

/**
 * UserRepository class.
 */
class UserRepository {
	/**
	 * UserRepository class constructor.
	 *
	 * @param {*} connection The database connection object.
	 */
	constructor(connection) {
		this.connection = connection;
		this.userDao = new UserDao(this.connection);
	}

	/**
	 * Retrieves all non-deleted/active users.
	 *
	 * @param {object} queryOptions The query options.
	 * @param {number} queryOptions.skip The query skip.
	 * @param {number} queryOptions.limit The query limit.
	 * @param {string} queryOptions.sort The order for the results.
	 * @param {string} queryOptions.status The user status to query.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The result of the query
	 */
	async findAll({ skip, limit, sort, status, search }) {
		const [result] = await this.userDao.getAll({
			skip,
			limit,
			sort,
			status,
			search,
		});

		return result;
	}

	/**
	 * Retrieves a non-deleted/active user by its id.
	 *
	 * @param {number} user_id The id of the user to query.
	 * @return {Promise} The result of the query
	 */
	async findById(user_id) {
		const [[result]] = await this.userDao.getById(user_id);

		return result;
	}

	/**
	 * Retrieves a non-deleted/active user by its email address.
	 *
	 * @param {string} email
	 * @return {Promise} The result of the query
	 */
	async findByEmail(email) {
		const [[result]] = await this.userDao.getByEmail(email);

		return result;
	}

	/**
	 * Stores a user.
	 *
	 * @param {object} user The user to store.
	 * @return {Promise} The result of the query
	 */
	async store(user) {
		const userDbEntity = userMapper.toDatabaseEntity(user);

		const [result] = await this.userDao.create(userDbEntity);

		return result.insertId;
	}

	/**
	 * Updates a user.
	 *
	 * @param {object} user
	 * @param {number} user_id The id of the user to update.
	 * @return {Promise} The result of the query
	 */
	async update(user, user_id) {
		const userDbEntity = userMapper.toDatabaseEntity(user);

		const [result] = await this.userDao.update(userDbEntity, user_id);

		return result.changedRows;
	}

	/**
	 * Deletes a user.
	 *
	 * @param {number} user_id The id of the user to delete.
	 * @return {Promise} The result of the query
	 */
	async deleteById(user_id) {
		const [result] = await this.userDao.deleteById(user_id);

		return result.changedRows;
	}

	/**
	 * Restores a user.
	 *
	 * @param {number} user_id The id of the user to restore.
	 * @return {Promise} The result of the query
	 */
	async restore(user_id) {
		const [result] = await this.userDao.restore(user_id);

		return result.changedRows;
	}
}

export default UserRepository;
