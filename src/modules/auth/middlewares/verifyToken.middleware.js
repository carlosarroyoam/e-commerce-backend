module.exports = ({ jsonwebtoken, authErrors, logger }) => (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];

  if (!accessToken) {
    res.status(401).send({
      message: 'Unauthorized',
      error: 'No token authorization provided',
    });
    return;
  }

  try {
    const decoded = jsonwebtoken.verify(accessToken);

    req.app.userId = decoded.sub;

    next();
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message,
    });

    throw new authErrors.ForbiddenError({ message: 'The provided token is not valid or the user hasn\'t access' });
  }
};
