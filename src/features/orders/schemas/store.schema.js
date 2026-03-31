import validators from '#core/utils/validators.util.js';

export default [
  validators.numberInBody('subtotal'),
  validators.numberInBody('tax_total', { required: false, min: 0 }),
  validators.numberInBody('shipping_total', { required: false, min: 0 }),
  validators.numberInBody('total'),
  validators.textInBody('notes', { required: false, min: 1, max: 255 }),
  validators.arrayInBody('items'),
  validators.resourceIdInBody('items.*.product_id'),
  validators.resourceIdInBody('items.*.variant_id'),
  validators.integerInBody('items.*.quantity'),
  validators.numberInBody('items.*.unit_price', { min: 0.01 }),
  validators.resourceIdInBody('customer_id'),
  validators.resourceIdInBody('shipping_address_id'),
];
