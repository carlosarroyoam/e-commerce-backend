/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../shared/utils/validators.util');

module.exports = [
  validators.resourceId('adminId'),

  validators.firstName
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The first_name is required'),

  validators.lastName
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The last_name is required'),
];
