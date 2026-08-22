import jwt from 'jsonwebtoken';

import config from '#core/config/index.js';

/**
 * @typedef {object} TokenPayload
 * @property {string} sub
 * @property {string} [userRole]
 * @property {number} [iat]
 * @property {number} [exp]
 * @property {string} [iss]
 */

/**
 * @typedef {object} SignPayload
 * @property {string} subject
 * @property {string} [userRole]
 */

/**
 * @typedef {object} SubjectPayload
 * @property {string} subject
 */

/**
 * Signs an access token for a subject, salted with the user's password hash.
 *
 * @param {SignPayload} payload
 * @param {string} password
 * @return {string} The signed token.
 */
function sign({ subject, userRole }, password) {
  const payload = {
    sub: subject,
    userRole,
  };

  const options = {
    expiresIn: config.JWT.EXPIRES_IN,
    issuer: `${config.APP.HOST}:${config.APP.PORT}`,
  };

  const token = jwt.sign(payload, config.JWT.SECRET_KEY + password, options);

  return token;
}

/**
 * Signs a refresh token for a subject.
 *
 * @param {SubjectPayload} payload
 * @return {string} The signed token.
 */
function signRefresh({ subject }) {
  const payload = {
    sub: subject,
  };

  const options = {
    expiresIn: config.JWT.REFRESH_EXPIRES_IN,
    issuer: `${config.APP.HOST}:${config.APP.PORT}`,
  };

  return jwt.sign(payload, config.JWT.REFRESH_SECRET_KEY, options);
}

/**
 * Signs a password recovery token for a subject, salted with the user's password hash.
 *
 * @param {SubjectPayload} payload
 * @param {string} password
 * @return {string} The signed token.
 */
function signPasswordRecoveryToken({ subject }, password) {
  const payload = {
    sub: subject,
  };

  const options = {
    expiresIn: config.JWT.PASSWORD_RECOVERY_EXPIRES_IN,
    issuer: `${config.APP.HOST}:${config.APP.PORT}`,
  };

  const token = jwt.sign(payload, config.JWT.PASSWORD_RECOVERY_SECRET_KEY + password, options);

  return token;
}

/**
 * Verifies an access token's signature and expiration against the user's password hash.
 *
 * @param {string} accessToken
 * @param {string} password
 * @return {string | TokenPayload} The decoded token.
 */
function verify(accessToken, password) {
  const decoded = jwt.verify(accessToken, config.JWT.SECRET_KEY + password);
  return decoded;
}

/**
 * Verifies a refresh token's signature and expiration.
 *
 * @param {string} refreshToken
 * @return {string | TokenPayload} The decoded token.
 */
function verifyRefresh(refreshToken) {
  const decoded = jwt.verify(refreshToken, config.JWT.REFRESH_SECRET_KEY);
  return decoded;
}

/**
 * Verifies a password recovery token's signature and expiration against the user's password hash.
 *
 * @param {string} accessToken
 * @param {string} password
 * @return {string | TokenPayload} The decoded token.
 */
function verifyPasswordRecoveryToken(accessToken, password) {
  const decoded = jwt.verify(accessToken, config.JWT.PASSWORD_RECOVERY_SECRET_KEY + password);
  return decoded;
}

/**
 * Decodes a token's payload without verifying its signature.
 *
 * @param {string} accessToken
 * @return {string | TokenPayload | null} The decoded token.
 */
function decode(accessToken) {
  const decoded = jwt.decode(accessToken, { complete: false });
  return decoded;
}

export default {
  sign,
  signRefresh,
  signPasswordRecoveryToken,
  verify,
  verifyRefresh,
  verifyPasswordRecoveryToken,
  decode,
};
