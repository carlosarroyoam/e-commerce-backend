/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../utils/validators.util');

module.exports = [
  validators.currentPassword
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The old_password is required'),

  validators.newPassword
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The new_password is required'),

  validators
    .confirmPassword('new_password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The confirm_password is required'),
];
