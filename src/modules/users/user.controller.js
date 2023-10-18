import userService from '#modules/users/user.service.js';
import userMapper from '#modules/users/user.mapper.js';

/**
 * UserController class.
 */
class UserController {
	/**
	 * Handles incoming request from the /user endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async index(request, response, next) {
		try {
			const { skip, limit, sort, status, search } = request.query;

			const users = await userService.findAll({
				skip,
				limit,
				sort,
				status,
				search,
			});

			const usersDto = users.map((user) => userMapper.toDto(user));

			response.json({
				message: 'Ok',
				users: usersDto,
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /users/:user_id endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async show(request, response, next) {
		try {
			const { user_id } = request.params;

			const user = await userService.findById(user_id);

			const userDto = userMapper.toDto(user);

			response.json({
				message: 'Ok',
				user: userDto,
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /users/:user_id endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async destroy(request, response, next) {
		try {
			const { user_id } = request.params;
			const { id: auth_user_id } = request.user;

			const deletedUserId = await userService.deleteById(user_id, auth_user_id);

			response.json({
				message: 'Ok',
				user: {
					id: deletedUserId,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /users/:user_id/restore endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async restore(request, response, next) {
		try {
			const { user_id } = request.params;
			const { id: auth_user_id } = request.user;

			const restoredUserId = await userService.restore(user_id, auth_user_id);

			response.json({
				message: 'Ok',
				user: {
					id: restoredUserId,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /users/:user_id/change-password endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async changePassword(request, response, next) {
		try {
			const { user_id } = request.params;
			const { current_password, new_password } = request.body;
			const { id: auth_user_id } = request.user;

			await userService.changePassword(
				{
					user_id,
					current_password,
					new_password,
				},
				auth_user_id
			);

			response.json({
				message: 'Ok',
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
