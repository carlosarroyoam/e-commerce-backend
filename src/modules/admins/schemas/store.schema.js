const validators = require('../../../common/utils/validators.util');

module.exports = [
  validators.firstName,

  validators.lastName,

  validators.email,

  validators.password,

  validators.confirmPassword('password'),
];
