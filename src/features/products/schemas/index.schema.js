import validators from '#core/utils/validators.util.js';

export default [
  validators.sort(['id', '-id', 'title', '-title']),
  validators.enumInQuery('status', ['active', 'inactive']),
  validators.page,
  validators.size,
  validators.search,
];
