const validators = require('../../../shared/utils/validators.util');

module.exports = [validators.skip, validators.search.optional()];
