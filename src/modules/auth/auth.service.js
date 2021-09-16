const dbConnectionPool = require('../../shared/lib/mysql/connectionPool');
const authRepository = require('./auth.repository');
const userRepository = require('../users/user.repository');
const sharedErrors = require('../../shared/errors');
const config = require('../../config');
const bcrypt = require('../../shared/lib/bcrypt');
const jsonwebtoken = require('../../shared/lib/jwt');
const logger = require('../../shared/lib/winston/logger');

/**
 *
 * @param {*} credentials The user credentials for the login attempt
 * @return {Promise} The user access token
 */
const login = async ({ email, password, device_fingerprint, user_agent }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userByEmail = await userRepository.findByEmailWithTrashed(email, connection);

    if (!userByEmail) {
      throw new sharedErrors.UserNotFoundError(email);
    }

    if (userByEmail.deleted_at !== null) {
      throw new sharedErrors.UnauthorizedError({ message: 'The user account is disabled' });
    }

    const passwordMatchResult = await bcrypt.compare(password, userByEmail.password);

    if (!passwordMatchResult) {
      throw new sharedErrors.UnauthorizedError({ email });
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

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

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

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 *
 * @param {*} credentials The refresh token
 * @return {Promise} The user access token
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
      });
    }

    const lastUsedAtDate = new Date();

    await authRepository.updatePersonalAccessToken(
      {
        last_used_at: lastUsedAtDate,
        updated_at: lastUsedAtDate,
      },
      currentPersonalAccessToken.id,
      connection
    );

    connection.release();

    return {
      access_token: token,
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
      });
    }

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 *
 * @param {*} credentials The user id for token verification
 * @return {Promise} The user access token
 */
const getUserForTokenVerify = async ({ user_id }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userById = await userRepository.findById(user_id, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError();
    }

    connection.release();

    return userById;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while authenticating');
    }

    throw err;
  }
};

/**
 *
 * @param {*} credentials The user credentials for the login attempt
 * @return {Promise} The user access token
 */
const forgotPassword = async ({ email }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const userByEmail = await userRepository.findByEmail(email, connection);

    connection.release();

    if (!userByEmail) {
      throw new sharedErrors.UserNotFoundError(email);
    }

    const token = await jsonwebtoken.signPasswordRecoveryToken(
      {
        subject: userByEmail.id,
      },
      userByEmail.password
    );

    // TODO send mail recovery link
    const passwordRecoveryURL = `${config.APP_URL}:${config.PORT}/auth/recover-password/${token}`;

    console.log(passwordRecoveryURL);

    return;
  } catch (err) {
    if (connection) connection.release();

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
        message: err.message,
      });

      throw new Error('Error while processing password request');
    }

    throw err;
  }
};

/**
 *
 * @param {*} credentials The user credentials for the login attempt
 * @return {Promise} The user access token
 */
const resetPassword = async ({ token, password }) => {
  let connection;

  try {
    connection = await dbConnectionPool.getConnection();

    const decoded = await jsonwebtoken.decode(token);

    if (decoded == null) {
      throw new sharedErrors.UnauthorizedError({
        message: 'The provided token is not valid',
      });
    }

    const userById = await userRepository.findById(decoded.sub, connection);

    if (!userById) {
      throw new sharedErrors.UserNotFoundError();
    }

    const decodedVerified = await jsonwebtoken.verifyPasswordRecoveryToken(
      token,
      userById.password
    );

    const hashPassword = await bcrypt.hashPassword(password);

    const changedRows = await userRepository.update(
      { password: hashPassword },
      decodedVerified.sub,
      connection
    );

    if (changedRows < 1) {
      throw new Error('User password was not changed');
    }

    return;
  } catch (err) {
    if (connection) connection.release();

    if (
      err.name == 'TokenExpiredError' ||
      err.name == 'JsonWebTokenError' ||
      err.name == 'NotBeforeError'
    ) {
      throw new sharedErrors.UnauthorizedError({
        message: 'The provided token is not valid or is expired',
      });
    }

    if (err.sqlMessage) {
      logger.log({
        level: 'error',
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
