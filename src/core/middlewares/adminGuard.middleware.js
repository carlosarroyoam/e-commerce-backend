import sharedErrors from '#core/errors/index.js';
import userRoles from '#features/auth/roles.js';

/**
 * Guards a route so only users with the admin role can access it.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
export default async (request, response, next) => {
  const { user } = request;

  if (user?.role !== userRoles.admin.type) {
    const forbiddenError = new sharedErrors.ForbiddenError(
      'The user has not permission to perform this action'
    );

    return next(forbiddenError);
  }

  next();
};
