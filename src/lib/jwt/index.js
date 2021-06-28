const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 *
 * @param {object} payload
 * @returns {Promise} The signed token
 */
function sign({ subject }) {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: subject,
    };

    const options = {
      expiresIn: config.JWT.EXPIRATION,
      issuer: config.APP_NAME,
    };

    jwt.sign(payload, config.JWT.SECRET, options, (err, token) => {
      if (err) return reject(err);

      return resolve(token);
    });
  });
}

/**
 * @param {string} accessToken
 * @returns {object | string} The decoded token
 */
function verify(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.JWT.SECRET, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
}

module.exports = {
  sign,
  verify,
};
