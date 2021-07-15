/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../utils/validators.util');

module.exports = [
  validators.refreshToken
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The refresh_token is required'),

  validators.browserFingerprint
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The browser_fingerprint is required'),
];
