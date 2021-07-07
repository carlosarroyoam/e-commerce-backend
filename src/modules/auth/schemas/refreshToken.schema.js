/* eslint-disable security/detect-non-literal-fs-filename */

const { body } = require('express-validator');

module.exports = [
    body('refresh_token')
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('The refresh_token is required')
        .isJWT()
        .withMessage('The refresh_token format is invalid')
];
