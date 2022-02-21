const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const authRepository = require('./auth.repository');
const userRepository = require('../users/user.repository');
const sharedErrors = require('../../shared/errors');
const config = require('../../config');
const bcrypt = require('../../shared/lib/bcrypt');
const jsonwebtoken = require('../../shared/lib/jwt');
const logger = require('../../shared/lib/winston/logger');

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
const login = async ({ email, password, device_fingerprint, user_agent }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userByEmail = await userRepository.findByEmail(email, connection);

    if (!userByEmail) {
      throw new sharedErrors.UserNotFoundError({ email });
    }

    if (userByEmail.deleted_at !== null) {
      throw new sharedErrors.UnauthorizedError({
        message: 'The user account is disabled',
        email: undefined,
      });
    }

    logger.profile('query running');
    const passwordMatchResult = await bcrypt.compare(password, userByEmail.password);
    logger.profile('query running');

    if (!passwordMatchResult) {
      throw new sharedErrors.UnauthorizedError({ message: undefined, email });
    }

    const personalAccessTokenByFingerPrint =
      await authRepository.getPersonalAccessTokenByFingerPrint(
        device_fingerprint,
        userByEmail.id,
        connection
      );

    const token = await jsonwebtoken.sign(
      {
        subject: userByEmail.id,
        userRole: userByEmail.user_role,
      },
      userByEmail.password
    );

    const refreshToken = await jsonwebtoken.signRefresh({
      subject: userByEmail.id,
    });

    if (personalAccessTokenByFingerPrint) {
      await authRepository.updatePersonalAccessToken(
        {
          token: refreshToken,
        },
        personalAccessTokenByFingerPrint.id,
        connection
      );
    } else {
      await authRepository.storePersonalAccessToken(
        {
          token: refreshToken,
          user_id: userByEmail.id,
          fingerprint: device_fingerprint,
          user_agent,
        },
        connection
      );
    }

    connection.release();

    return {
      user_id: userByEmail.id,
      user_role_id: userByEmail.user_role_id,
      user_role: userByEmail.user_role,
      access_token: token,
      refresh_token: refreshToken,
    };
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 * Logs out a user and deletes the refresh token.
 *
 * @param {object} sessionDetails The user session to delete.
 * @param {string} sessionDetails.refresh_token The user's refresh token.
 * @param {number} sessionDetails.user_id The user's id.
 */
const logout = async ({ refresh_token, user_id }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const currentPersonalAccessToken = await authRepository.getPersonalAccessToken(
      refresh_token,
      user_id,
      connection
    );

    if (!currentPersonalAccessToken) {
      connection.release();
      return;
    }

    await authRepository.deleteRefreshToken(refresh_token, user_id, connection);

    connection.release();
  } catch (err) {
    if (connection) connection.release();

    if (!err.status) {
      logger.error({
        message: err.message,
      });

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 * Gets new access tokens.
 *
 * @param {object} refreshToken The refresh token.
 * @param {string} refreshToken.refresh_token The user's refresh token.
 * @param {string} refreshToken.device_fingerprint The device's fingerprint.
 * @return {Promise} The user access token.
 */
const refreshToken = async ({ refresh_token, device_fingerprint }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const decoded = await jsonwebtoken.verifyRefresh(refresh_token);

    const userById = await userRepository.findById(decoded.sub, connection);

    if (!userById) {
      throw new sharedErrors.UnauthorizedError({
        message: 'User is not active',
        email: undefined,
      });
    }

    const token = await jsonwebtoken.sign(
      {
        subject: userById.id,
        userRole: userById.user_role,
      },
      userById.password
    );

    const currentPersonalAccessToken = await authRepository.getPersonalAccessToken(
      refresh_token,
      decoded.sub,
      connection
    );

    if (
      !currentPersonalAccessToken ||
      currentPersonalAccessToken.fingerprint !== device_fingerprint
    ) {
      throw new sharedErrors.UnauthorizedError({
        message: 'The provided token is not valid',
        email: undefined,
      });
    }

    const refreshToken = await jsonwebtoken.signRefresh({
      subject: userById.id,
    });

    const lastUsedAtDate = new Date();

    await authRepository.updatePersonalAccessToken(
      {
        token: refreshToken,
        last_used_at: lastUsedAtDate,
        updated_at: lastUsedAtDate,
      },
      currentPersonalAccessToken.id,
      connection
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

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 * Gets user information for token verification.
 *
 * @param {object} user The user data to verify.
 * @param {number} user.user_id The user's id.
 * @return {Promise} The user information object.
 */
const getUserForTokenVerify = async ({ user_id }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

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

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 * Generates a password reset link.
 *
 * @param {object} forgotPassword The user credentials to reset.
 * @param {string} forgotPassword.email The user's email.
 */
const forgotPassword = async ({ email }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userByEmail = await userRepository.findByEmail(email, connection);

    connection.release();

    if (!userByEmail) {
      throw new sharedErrors.UserNotFoundError({ email });
    }

    const token = await jsonwebtoken.signPasswordRecoveryToken(
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

      throw new Error('Error while processing password request');
    }

    throw err;
  }
};

/**
 * Resets a user's password.
 *
 * @param {object} resetPassword The user credentials to reset.
 * @param {string} resetPassword.token The reset password token.
 * @param {string} resetPassword.password The new password.
 */
const resetPassword = async ({ token, password }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const decoded = await jsonwebtoken.decode(token);

    if (decoded == null) {
      throw new sharedErrors.UnauthorizedError({
        message: 'The provided token is not valid',
        email: undefined,
      });
    }

    const userById = await userRepository.findById(decoded.sub, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError({ email: undefined });
    }

    const decodedVerified = await jsonwebtoken.verifyPasswordRecoveryToken(
      token,
      userById.password
    );

    const hashPassword = await bcrypt.hashPassword(password);

    await userRepository.update({ password: hashPassword }, decodedVerified.sub, connection);

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

      throw new Error('Error while resetting password');
    }

    throw err;
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  getUserForTokenVerify,
  forgotPassword,
  resetPassword,
};
