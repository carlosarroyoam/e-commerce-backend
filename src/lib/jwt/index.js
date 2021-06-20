const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 *
 * @param {object} payload
 * @returns {string} The signed token
 */
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

/**
 * @param {string} accessToken
 * @returns {object | string} The decoded token
 */
function verify(accessToken) {
  return jwt.verify(accessToken, config.JWT.SECRET);
}

module.exports = {
  sign,
  verify,
};
