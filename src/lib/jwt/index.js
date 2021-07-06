const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 *
 * @param {object} payload
 * @return {Promise} The signed token
 */
function sign({ subject, userRole }) {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: subject,
            userRole,
        };

        const options = {
            expiresIn: config.JWT.EXPIRES_IN,
            issuer: config.APP_NAME,
        };

        jwt.sign(payload, config.JWT.SECRET_KEY, options, (err, token) => {
            if (err) return reject(err);

            return resolve(token);
        });
    });
}

/**
 * @param {string} accessToken
 * @return {object | string} The decoded token
 */
function verify(accessToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, config.JWT.SECRET_KEY, (err, decoded) => {
            if (err) return reject(err);

            return resolve(decoded);
        });
    });
}

module.exports = {
    sign,
    verify,
};
