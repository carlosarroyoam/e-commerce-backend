const sharedErrors = require('../../shared/errors');
const userRoles = require('../../modules/auth/roles');

module.exports = async (request, response, next) => {
  const { user } = request;

  if (user?.role !== userRoles.admin.type) {
    const forbiddenError = new sharedErrors.ForbiddenError({
      message: 'The user has not permission to perform this action',
    });

    return next(forbiddenError);
  }

  next();
};
