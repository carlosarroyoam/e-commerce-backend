const authErrors = require('../errors/');
const userRoles = require('../roles');

module.exports = async (request, response, next) => {
  const { user } = request;

  if (!user.role || user.role !== userRoles.admin.type) {
    const forbiddenError = new authErrors.ForbiddenError({
      message: 'The user has not permission to perform this action',
    });

    return next(forbiddenError);
  }

  next();
};
