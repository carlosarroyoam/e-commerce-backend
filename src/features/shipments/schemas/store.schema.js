import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('order_id'),
  validators.resourceIdInBody('carrier_id'),
  validators.textInBody('tracking_number', {
    required: false,
    min: 3,
    max: 64,
    pattern: /^[A-Za-z0-9-_]+$/,
  }),
];
