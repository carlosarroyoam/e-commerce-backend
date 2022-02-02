const validators = require('../../../shared/utils/validators.util');

module.exports = [validators.sort(['title', '-title']), validators.skip, validators.limit];
