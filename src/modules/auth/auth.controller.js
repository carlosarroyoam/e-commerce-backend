const ms = require('ms');
const authService = require('./auth.service');
const config = require('../../common/config');

/**
 * AuthController class.
 */
class AuthController {
	/**
	 * Handles incoming request from the /auth/login endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async login(request, response, next) {
		try {
			const { email, password, device_fingerprint } = request.body;
			const user_agent = request.headers['user-agent'];

			const auth = await authService.login({
				email,
				password,
				device_fingerprint,
				user_agent,
			});

			response
				.cookie('access_token', `Bearer ${auth.access_token}`, {
					maxAge: ms(config.JWT.EXPIRES_IN),
					httpOnly: true,
					sameSite: true,
				})
				.cookie('refresh_token', auth.refresh_token, {
					maxAge: ms(config.JWT.REFRESH_EXPIRES_IN),
					httpOnly: true,
					sameSite: true,
				})
				.json({
					message: 'Ok',
					data: auth,
				});
		} catch (error) {
			response.clearCookie('access_token').clearCookie('refresh_token');

			next(error);
		}
	}

	/**
	 * Handles incoming request from the /auth/logout endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async logout(request, response, next) {
		try {
			const { refresh_token } = request.cookies;

			await authService.logout({
				refresh_token,
			});

			response.clearCookie('access_token').clearCookie('refresh_token').status(204).end();
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /auth/refresh-token endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async refreshToken(request, response, next) {
		try {
			const { refresh_token } = request.cookies;
			const { device_fingerprint } = request.body;

			const refreshToken = await authService.refreshToken({
				refresh_token,
				device_fingerprint,
			});

			response
				.cookie('access_token', `Bearer ${refreshToken.access_token}`, {
					maxAge: ms(config.JWT.EXPIRES_IN),
					httpOnly: true,
					sameSite: true,
				})
				.cookie('refresh_token', refreshToken.refresh_token, {
					maxAge: ms(config.JWT.REFRESH_EXPIRES_IN),
					httpOnly: true,
					sameSite: true,
				})
				.json({
					message: 'Ok',
					data: refreshToken,
				});
		} catch (error) {
			response.clearCookie('access_token').clearCookie('refresh_token');

			next(error);
		}
	}

	/**
	 * Handles incoming request from the /auth/forgot-password endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async forgotPassword(request, response, next) {
		try {
			const { email } = request.body;

			await authService.forgotPassword({
				email,
			});

			response.json({
				message: 'Ok',
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /auth/reset-password endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async resetPassword(request, response, next) {
		try {
			const { token } = request.query;
			const { password } = request.body;

			await authService.resetPassword({
				token,
				password,
			});

			response.json({
				message: 'Ok',
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthController();
