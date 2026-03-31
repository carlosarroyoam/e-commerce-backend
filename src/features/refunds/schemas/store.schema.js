import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('order_id'),
  validators.textInBody('reason', { required: false, min: 1, max: 500 }),
  validators.arrayInBody('items'),
  validators.integerInBody('items.*.order_item_id'),
  validators.integerInBody('items.*.quantity'),
  validators.numberInBody('items.*.amount', { min: 0.01 }),
];
