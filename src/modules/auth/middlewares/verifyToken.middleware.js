module.exports = ({ jsonwebtoken }) => (req, res, next) => {
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
    jsonwebtoken.verify(accessToken);

    next();
  } catch (err) {
    res.status(403).send({ message: 'Forbidden', error: 'The provided token is not valid or the user hasn\'t access' });
  }
};
