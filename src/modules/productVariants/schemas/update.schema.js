const validators = require('../../../shared/utils/validators.util');

module.exports = [validators.resourceId('customer_id'), validators.firstName, validators.lastName];
