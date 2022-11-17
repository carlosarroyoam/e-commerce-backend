const validators = require('../../../common/utils/validators.util');

module.exports = [
	validators.resourceId('customer_id'),
	validators.resourceId('address_id'),
	validators.street_name,
	validators.street_number,
	validators.sublocality,
	validators.locality,
	validators.state,
	validators.postal_code,
];
