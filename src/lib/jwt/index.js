const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * @param {object} payload
 * @param {string} password
 * @return {Promise} The signed token
 */
function sign({ subject, userRole }, password) {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: subject,
      userRole,
    };

    const options = {
      expiresIn: config.JWT.EXPIRES_IN,
      issuer: config.APP_NAME,
    };

    jwt.sign(payload, config.JWT.SECRET_KEY + password, options, (err, token) => {
      if (err) return reject(err);

      return resolve(token);
    });
  });
}

/**
 *
 * @param {object} payload
 * @return {Promise} The signed token
 */
function signRefresh({ subject }) {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: subject,
    };

    const options = {
      expiresIn: config.JWT.REFRESH_EXPIRES_IN,
      issuer: config.APP_NAME,
    };

    jwt.sign(payload, config.JWT.REFRESH_SECRET_KEY, options, (err, token) => {
      if (err) return reject(err);

      return resolve(token);
    });
  });
}

/**
 * @param {string} accessToken
 * @param {string} password
 * @return {object | string} The decoded token
 */
function verify(accessToken, password) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.JWT.SECRET_KEY + password, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
}

/**
 * @param {string} refreshToken
 * @return {object | string} The decoded token
 */
function verifyRefresh(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.JWT.REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
}

/**
 * @param {string} accessToken
 * @return {null | object} The decoded token
 */
function decode(accessToken) {
  return new Promise((resolve, reject) => {
    const decoded = jwt.decode(accessToken, { complete: true });

    resolve(decoded);
  });
}

module.exports = {
  sign,
  signRefresh,
  verify,
  verifyRefresh,
  decode,
};
