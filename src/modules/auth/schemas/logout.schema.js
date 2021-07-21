/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../shared/utils/validators.util');

module.exports = [
  validators.refreshToken
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The refresh_token is required'),
];
