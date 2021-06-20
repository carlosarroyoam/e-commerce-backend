module.exports = ({ jsonwebtoken, authErrors, logger }) => async (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];

  if (!accessToken) {
    return next(new authErrors.UnauthorizedError({ message: 'No token authorization provided' }));
  }

  try {
    const decoded = await jsonwebtoken.verify(accessToken);

    req.app.userId = decoded.sub;

    next();
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message,
    });

    next(new authErrors.ForbiddenError({ message: 'The provided token is not valid or the user hasn\'t access' }));
  }
};
