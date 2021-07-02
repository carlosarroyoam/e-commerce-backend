const bcrypt = require("bcrypt");
const config = require("../../config");

/**
 * @param {string | Buffer} plainTextPassword
 */
async function hashPassword(plainTextPassword) {
    return bcrypt.hash(plainTextPassword, config.BCRYPT.SALT_ROUNDS);
}

/**
 * @param {string | Buffer} plainTextPassword
 * @param {string} passwordHash
 */
async function compare(plainTextPassword, passwordHash) {
    return bcrypt.compare(plainTextPassword, passwordHash);
}

module.exports = {
    hashPassword,
    compare,
};
