module.exports = ({ authErrors, userRoles }) => async (req, res, next) => {
  const { user } = req.app;

  if (user.role !== userRoles.admin) {
    const forbiddenError = new authErrors.ForbiddenError({ message: 'The user has not permission to perform this action' });
    return next(forbiddenError);
  }

  next();
};
