const authService = require('../../modules/auth/auth.service');
const sharedErrors = require('../errors');
const jsonwebtoken = require('../lib/jwt');
const logger = require('../lib/winston/logger');

module.exports = async (request, response, next) => {
  try {
    const { access_token } = request.cookies;

    const accessToken =
      access_token && access_token.startsWith('Bearer') && access_token.split(' ')[1];

    if (!accessToken) {
      const unauthorizedError = new sharedErrors.UnauthorizedError({
        message: 'No token authorization provided',
        email: undefined,
      });

      return next(unauthorizedError);
    }

    const decoded = await jsonwebtoken.decode(accessToken);

    if (!decoded?.sub) {
      const unauthorizedError = new sharedErrors.UnauthorizedError({
        message: 'Error while decoding token',
        email: undefined,
      });

      return next(unauthorizedError);
    }

    const userById = await authService.getUserForTokenVerify({ user_id: decoded.sub });

    if (userById.deleted_at !== null) {
      const unauthorizedError = new sharedErrors.UnauthorizedError({
        message: 'The user account is disabled',
        email: undefined,
      });

      return next(unauthorizedError);
    }

    await jsonwebtoken.verify(accessToken, userById.password);

    request.user = {
      id: userById.id,
      role: userById.user_role,
    };

    next();
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message,
    });

    const unauthorizedError = new sharedErrors.UnauthorizedError({
      message: 'The provided token is not valid or the user has not access',
      email: undefined,
    });

    next(unauthorizedError);
  }
};
