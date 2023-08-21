import validators from '#common/utils/validators.util.js';

export default [
	validators.resourceId('customer_id'),
	validators.resourceId('address_id'),
	validators.street_name,
	validators.street_number,
	validators.sublocality,
	validators.locality,
	validators.state,
	validators.postal_code,
];
