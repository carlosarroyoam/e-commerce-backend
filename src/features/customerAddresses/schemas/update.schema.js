import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('customer_id'),
  validators.resourceId('address_id'),
  validators.textInBody('street_name', { min: 5, max: 64 }),
  validators.textInBody('street_number', { min: 1, max: 5 }),
  validators.textInBody('sublocality', { min: 5, max: 45 }),
  validators.textInBody('locality', { min: 5, max: 45 }),
  validators.textInBody('state', { min: 5, max: 45 }),
  validators.textInBody('postal_code', { min: 5, max: 5 }),
  validators.textInBody('phone_number', { min: 10, max: 10 }),
  validators.textInBody('country', { min: 2, max: 5 }),
];
