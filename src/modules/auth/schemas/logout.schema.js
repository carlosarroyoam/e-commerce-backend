const validators = require('../../../shared/utils/validators.util');

module.exports = [validators.refreshToken, validators.resourceIdInBody('user_id')];
