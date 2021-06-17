const jwt = require('jsonwebtoken');
const config = require('../../config');

function sign({ subject }) {
  const payload = {
    sub: subject,
  };

  const token = jwt.sign(
    payload,
    config.JWT.SECRET,
    {
      expiresIn: config.JWT.EXPIRATION,
      issuer: config.APP_NAME,
    },
  );

  return token;
}

function verify(accessToken) {
  return jwt.verify(accessToken, config.JWT.SECRET);
}

module.exports = {
  sign,
  verify,
};
