/* eslint-disable security/detect-non-literal-fs-filename */

const validators = require('../../../utils/validators.util');

module.exports = [
  validators.email
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The email is required'),
];
