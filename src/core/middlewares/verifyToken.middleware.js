import authService from '#modules/auth/auth.service.js';
import sharedErrors from '#core/errors/index.js';
import jsonwebtoken from '#core/lib/jwt/index.js';
import logger from '#core/lib/winston/logger.js';

export default async (request, response, next) => {
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

    const decoded = jsonwebtoken.decode(accessToken);

    if (!decoded?.sub) {
      const unauthorizedError = new sharedErrors.UnauthorizedError({
        message: 'Error while decoding token',
        email: undefined,
      });

      return next(unauthorizedError);
    }

    const userById = await authService.getUserForTokenVerify({
      user_id: Number(decoded.sub),
    });

    if (userById.deleted_at !== null) {
      const unauthorizedError = new sharedErrors.UnauthorizedError({
        message: 'The user account is disabled',
        email: undefined,
      });

      return next(unauthorizedError);
    }

    jsonwebtoken.verify(accessToken, userById.password);

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
