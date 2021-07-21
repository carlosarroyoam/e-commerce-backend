/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../shared/utils/validators.util');

module.exports = [
  validators.firstName
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The first_name is required'),

  validators.lastName
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The last_name is required'),

  validators.email
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The email is required'),

  validators.password
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The password is required'),

  validators
    .confirmPassword('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The confirm_password is required'),
];
