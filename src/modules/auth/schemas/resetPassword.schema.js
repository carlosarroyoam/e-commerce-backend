const validators = require('../../../shared/utils/validators.util');

module.exports = [validators.password, validators.confirmPassword('password')];
