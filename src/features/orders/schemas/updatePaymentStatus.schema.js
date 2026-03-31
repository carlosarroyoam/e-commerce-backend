import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('order_id'),
  validators.resourceIdInBody('payment_status_id'),
];
