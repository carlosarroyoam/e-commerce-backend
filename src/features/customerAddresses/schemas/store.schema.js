import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('customer_id'),
  validators.street_name,
  validators.street_number,
  validators.sublocality,
  validators.locality,
  validators.state,
  validators.postal_code,
  validators.phone_number,
];
