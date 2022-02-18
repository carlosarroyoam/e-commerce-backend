const authService = require('./auth.service');

/**
 * Handles incoming request from the /auth/login endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const login = async (request, response, next) => {
  try {
    const { email, password, device_fingerprint } = request.body;
    const user_agent = request.headers['user-agent'];

    const auth = await authService.login({
      email,
      password,
      device_fingerprint,
      user_agent,
    });

    response.json({
      message: 'Ok',
      data: auth,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /auth/logout endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const logout = async (request, response, next) => {
  try {
    const { refresh_token, user_id } = request.body;

    await authService.logout({
      refresh_token,
      user_id,
    });

    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /auth/refresh-token endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const refreshToken = async (request, response, next) => {
  try {
    const { refresh_token, device_fingerprint } = request.body;

    const refreshToken = await authService.refreshToken({
      refresh_token,
      device_fingerprint,
    });

    response.json({
      message: 'Ok',
      data: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /auth/forgot-password endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const forgotPassword = async (request, response, next) => {
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
};

/**
 * Handles incoming request from the /auth/reset-password endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const resetPassword = async (request, response, next) => {
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
};

module.exports = {
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
};
