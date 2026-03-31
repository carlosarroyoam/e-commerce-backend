import validators from '#core/utils/validators.util.js';

export default [
  validators.search,
  validators.page,
  validators.size,
  validators.sort([
    'id',
    '-id',
    'order_number',
    '-order_number',
    'customer_id',
    '-customer_id',
    'status',
    '-status',
    'payment_status',
    '-payment_status',
    'subtotal',
    '-subtotal',
    'total',
    '-total',
    'created_at',
    '-created_at',
    'updated_at',
    '-updated_at',
  ]),
];
