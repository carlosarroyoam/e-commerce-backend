import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('order_id'),
  validators.resourceIdInBody('status_id'),
  validators.textInBody('notes', { required: false, min: 1, max: 500 }),
];
