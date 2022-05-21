const validators = require('../../../common/utils/validators.util');

module.exports = [validators.password, validators.confirmPassword('password')];
