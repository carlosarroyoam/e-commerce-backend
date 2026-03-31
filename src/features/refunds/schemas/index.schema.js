import validators from '#core/utils/validators.util.js';

export default [
  validators.search,
  validators.page,
  validators.size,
  validators.sort([
    'id',
    '-id',
    'order_id',
    '-order_id',
    'order_number',
    '-order_number',
    'amount',
    '-amount',
    'created_at',
    '-created_at',
  ]),
  validators.resourceIdInQuery('order_id'),
];
