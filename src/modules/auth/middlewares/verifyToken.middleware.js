module.exports = ({ jsonwebtoken, logger }) => (req, res, next) => {
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

    next();
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message,
    });

    res.status(403).send({ message: 'Forbidden', error: 'The provided token is not valid or the user hasn\'t access' });
  }
};
