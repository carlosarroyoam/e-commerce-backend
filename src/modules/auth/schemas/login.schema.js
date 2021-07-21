/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../shared/utils/validators.util');

module.exports = [
  validators.email
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The email is required'),

  validators.password
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The password is required'),

  validators.browserFingerprint
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The browser_fingerprint is required'),
];
