import AuthRepository from './auth.repository.js';
import UserRepository from '../users/user.repository.js';
import config from '../../common/config/index.js';
import sharedErrors from '../../common/errors/index.js';
import bcrypt from '../../common/lib/bcrypt/index.js';
import jsonwebtoken from '../../common/lib/jwt/index.js';
import dbConnectionPool from '../../common/lib/mysql/connectionPool.js';
import logger from '../../common/lib/winston/logger.js';

/**
 * AuthService class.
 */
class AuthService {
	/**
	 * Authenticates a users.
	 *
	 * @param {object} credentials The user credentials for the login attempt
	 * @param {string} credentials.email The user's email.
	 * @param {string} credentials.password The user's password.
	 * @param {string} credentials.device_fingerprint The device fingerprint.
	 * @param {string} credentials.user_agent The device user agent.
	 * @return {Promise} The user access token
	 */
	async login({ email, password, device_fingerprint, user_agent }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);
			const authRepository = new AuthRepository(connection);

			const userByEmail = await userRepository.findByEmail(email);

			if (!userByEmail) {
				throw new sharedErrors.UserNotFoundError({ email });
			}

			if (userByEmail.deleted_at !== null) {
				throw new sharedErrors.UnauthorizedError({
					message: 'The user account is disabled',
					email: undefined,
				});
			}

			const passwordMatchResult = await bcrypt.compare(password, userByEmail.password);

			if (!passwordMatchResult) {
				throw new sharedErrors.UnauthorizedError({ message: undefined, email });
			}

			const personalAccessTokenByFingerPrint =
				await authRepository.getPersonalAccessTokenByFingerPrint(
					device_fingerprint,
					userByEmail.id
				);

			const token = jsonwebtoken.sign(
				{
					subject: userByEmail.id,
					userRole: userByEmail.user_role,
				},
				userByEmail.password
			);

			const refreshToken = jsonwebtoken.signRefresh({
				subject: userByEmail.id,
			});

			if (personalAccessTokenByFingerPrint) {
				await authRepository.updatePersonalAccessToken(
					{
						token: refreshToken,
					},
					personalAccessTokenByFingerPrint.id
				);
			} else {
				await authRepository.storePersonalAccessToken({
					token: refreshToken,
					user_id: userByEmail.id,
					fingerprint: device_fingerprint,
					user_agent,
				});
			}

			connection.release();

			return {
				user_id: userByEmail.id,
				user_role_id: userByEmail.user_role_id,
				user_role: userByEmail.user_role,
				access_token: token,
				refresh_token: refreshToken,
				device_fingerprint,
			};
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while authenticating');
			}

			throw err;
		}
	}

	/**
	 * Logs out a user and deletes the refresh token.
	 *
	 * @param {object} sessionDetails The user session to delete.
	 * @param {string} sessionDetails.refresh_token The user's refresh token.
	 */
	async logout({ refresh_token }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const authRepository = new AuthRepository(connection);

			const currentPersonalAccessToken = await authRepository.getPersonalAccessToken(refresh_token);

			if (!currentPersonalAccessToken) {
				connection.release();
				return;
			}

			await authRepository.deleteRefreshToken(refresh_token);

			connection.release();
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while logging out');
			}

			throw err;
		}
	}

	/**
	 * Gets new access tokens.
	 *
	 * @param {object} refreshToken The refresh token.
	 * @param {string} refreshToken.refresh_token The user's refresh token.
	 * @param {string} refreshToken.device_fingerprint The device's fingerprint.
	 * @return {Promise} The user access token.
	 */
	async refreshToken({ refresh_token, device_fingerprint }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);
			const authRepository = new AuthRepository(connection);

			const decoded = jsonwebtoken.verifyRefresh(refresh_token);

			const userById = await userRepository.findById(Number(decoded.sub));

			if (!userById) {
				throw new sharedErrors.UnauthorizedError({
					message: 'User is not active',
					email: undefined,
				});
			}

			const token = jsonwebtoken.sign(
				{
					subject: userById.id,
					userRole: userById.user_role,
				},
				userById.password
			);

			const currentPersonalAccessToken = await authRepository.getPersonalAccessToken(refresh_token);

			if (
				!currentPersonalAccessToken ||
				currentPersonalAccessToken.fingerprint !== device_fingerprint
			) {
				throw new sharedErrors.UnauthorizedError({
					message: 'The provided token is not valid',
					email: undefined,
				});
			}

			const refreshToken = jsonwebtoken.signRefresh({
				subject: userById.id,
			});

			const lastUsedAtDate = new Date();

			await authRepository.updatePersonalAccessToken(
				{
					token: refreshToken,
					last_used_at: lastUsedAtDate,
					updated_at: lastUsedAtDate,
				},
				currentPersonalAccessToken.id
			);

			connection.release();

			return {
				access_token: token,
				refresh_token: refreshToken,
			};
		} catch (err) {
			if (connection) connection.release();

			if (
				err.name == 'TokenExpiredError' ||
				err.name == 'JsonWebTokenError' ||
				err.name == 'NotBeforeError'
			) {
				throw new sharedErrors.UnauthorizedError({
					message: 'The provided token is not valid',
					email: undefined,
				});
			}

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while refreshing token');
			}

			throw err;
		}
	}

	/**
	 * Gets user information for token verification.
	 *
	 * @param {object} user The user data to verify.
	 * @param {number} user.user_id The user's id.
	 * @return {Promise} The user information object.
	 */
	async getUserForTokenVerify({ user_id }) {
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

				throw new sharedErrors.InternalServerError('Error while authenticating');
			}

			throw err;
		}
	}

	/**
	 * Generates a password reset link.
	 *
	 * @param {object} forgotPassword The user credentials to reset.
	 * @param {string} forgotPassword.email The user's email.
	 */
	async forgotPassword({ email }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const userByEmail = await userRepository.findByEmail(email);

			connection.release();

			if (!userByEmail) {
				throw new sharedErrors.UserNotFoundError({ email });
			}

			const token = jsonwebtoken.signPasswordRecoveryToken(
				{
					subject: userByEmail.id,
				},
				userByEmail.password
			);

			// TODO send mail recovery link
			const passwordRecoveryURL = `${config.APP.URL}:${config.APP.PORT}/auth/recover-password/${token}`;

			console.log(passwordRecoveryURL);

			return;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while requesting password reset');
			}

			throw err;
		}
	}

	/**
	 * Resets a user's password.
	 *
	 * @param {object} resetPassword The user credentials to reset.
	 * @param {string} resetPassword.token The reset password token.
	 * @param {string} resetPassword.password The new password.
	 */
	async resetPassword({ token, password }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);

			const decoded = jsonwebtoken.decode(token);

			if (decoded == null) {
				throw new sharedErrors.UnauthorizedError({
					message: 'The provided token is not valid',
					email: undefined,
				});
			}

			const userById = await userRepository.findById(Number(decoded.sub));

			if (!userById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			const decodedVerified = jsonwebtoken.verifyPasswordRecoveryToken(token, userById.password);

			const hashPassword = await bcrypt.hashPassword(password);

			await userRepository.update({ password: hashPassword }, Number(decodedVerified.sub));

			return;
		} catch (err) {
			if (connection) connection.release();

			if (
				err.name === 'TokenExpiredError' ||
				err.name === 'JsonWebTokenError' ||
				err.name === 'NotBeforeError'
			) {
				throw new sharedErrors.UnauthorizedError({
					message: 'The provided token is not valid or is expired',
					email: undefined,
				});
			}

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while resetting password');
			}

			throw err;
		}
	}
}

export default new AuthService();
