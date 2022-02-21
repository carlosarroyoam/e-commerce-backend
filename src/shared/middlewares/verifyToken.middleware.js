const authService = require('../../modules/auth/auth.service');
const sharedErrors = require('../../shared/errors/');
const jsonwebtoken = require('../../shared/lib/jwt');
const logger = require('../../shared/lib/winston/logger');

module.exports = async (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const accessToken =
      authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1];

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
