import UserRepository from './user.repository.js';
import sharedErrors from '../../common/errors/index.js';
import bcrypt from '../../common/lib/bcrypt/index.js';
import dbConnectionPool from '../../common/lib/mysql/connectionPool.js';
import logger from '../../common/lib/winston/logger.js';

/**
 * UserService class.
 */
class UserService {
	/**
	 * Retrieves all users.
	 *
	 * @param {object} queryOptions The query options.
	 * @param {number} queryOptions.skip The query skip.
	 * @param {number} queryOptions.limit The query limit.
	 * @param {string} queryOptions.sort The order for the results.
	 * @param {string} queryOptions.status The user status to query.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The list of users.
	 */
	async findAll({ skip, limit, sort, status, search }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const users = await userRepository.findAll({
				skip,
				limit,
				sort,
				status,
				search,
			});

			connection.release();

			return users;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving users');
			}

			throw err;
		}
	}

	/**
	 * Retrieves a user by its id.
	 *
	 * @param {number} user_id The id of the user to retrieve.
	 * @return {Promise} The user.
	 */
	async findById(user_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const userById = await userRepository.findById(user_id);

			if (!userById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			connection.release();

			return userById;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving user');
			}

			throw err;
		}
	}

	/**
	 * Deletes a user by its id.
	 *
	 * @param {number} user_id The id of the user to delete.
	 * @param {object} auth_user_id The id of the authenticated user.
	 * @return {Promise} The id of the deleted user.
	 */
	async deleteById(user_id, auth_user_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const userById = await userRepository.findById(user_id);

			if (!userById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			if (userById.deleted_at !== null) {
				throw new sharedErrors.BadRequestError('The user is already inactive');
			}

			if (auth_user_id === userById.id) {
				throw new sharedErrors.BadRequestError('A user cannot deactivate to itself');
			}

			await userRepository.deleteById(user_id);

			connection.release();

			return user_id;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while deleting user');
			}

			throw err;
		}
	}

	/**
	 * Restores a user by its id.
	 *
	 * @param {number} user_id The id of the user to restore.
	 * @param {object} auth_user_id The id of the authenticated user.
	 * @return {Promise} The id of the restored user.
	 */
	async restore(user_id, auth_user_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const userById = await userRepository.findById(user_id);

			if (!userById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			if (userById.deleted_at === null) {
				throw new sharedErrors.BadRequestError('The user is already active');
			}

			if (auth_user_id === userById.id) {
				throw new sharedErrors.BadRequestError('A user cannot activate to itself');
			}

			await userRepository.restore(user_id);

			connection.release();

			return user_id;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while restoring user');
			}

			throw err;
		}
	}

	/**
	 * Changes a user's password.
	 *
	 * @param {object} user The user object.
	 * @param {number} user.user_id The id of the user to restore.
	 * @param {string} user.current_password The current password of the user.
	 * @param {string} user.new_password The new password of the user.
	 * @param {object} auth_user_id The id of the authenticated user.
	 * @return {Promise} The id of the restored user.
	 */
	async changePassword({ user_id, current_password, new_password }, auth_user_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const userById = await userRepository.findById(user_id);

			if (!userById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			if (auth_user_id !== userById.id) {
				throw new sharedErrors.UnauthorizedError({
					message: `User doesn't have permission to perform this action`,
					email: undefined,
				});
			}

			const passwordMatchResult = await bcrypt.compare(current_password, userById.password);

			if (!passwordMatchResult) {
				throw new sharedErrors.BadRequestError('Invalid credentials. Please try again');
			}

			const hashPassword = await bcrypt.hashPassword(new_password);

			await userRepository.update({ password: hashPassword }, user_id);

			connection.release();

			return;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while changing user password');
			}

			throw err;
		}
	}
}

export default new UserService();
