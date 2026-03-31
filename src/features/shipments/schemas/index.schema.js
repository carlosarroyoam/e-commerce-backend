import validators from '#core/utils/validators.util.js';

export default [
  validators.page,
  validators.size,
  validators.sort([
    'id',
    '-id',
    'order_id',
    '-order_id',
    'order_number',
    '-order_number',
    'carrier',
    '-carrier',
    'tracking_number',
    '-tracking_number',
    'shipped_at',
    '-shipped_at',
    'delivered_at',
    '-delivered_at',
  ]),
];
