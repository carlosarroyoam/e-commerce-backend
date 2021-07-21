/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../utils/validators.util');

module.exports = [
  validators.password
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The password is required'),

  validators
    .confirmPassword('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The confirm_password is required'),
];
