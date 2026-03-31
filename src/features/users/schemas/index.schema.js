import validators from '#core/utils/validators.util.js';

export default [
  validators.page,
  validators.size,
  validators.search,
  validators.sort([
    'id',
    '-id',
    'first_name',
    '-first_name',
    'last_name',
    '-last_name',
    'email',
    '-email',
  ]),
  validators.enumInQuery('status', ['active', 'inactive']),
];
