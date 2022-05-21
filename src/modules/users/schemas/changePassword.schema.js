const validators = require('../../../common/utils/validators.util');

module.exports = [
  validators.currentPassword,

  validators.newPassword,

  validators.confirmPassword('new_password'),
];
