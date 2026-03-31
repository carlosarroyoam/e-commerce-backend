import validators from '#core/utils/validators.util.js';

export default [
  validators.search,
  validators.page,
  validators.size,
  validators.sort(['id', '-id', 'title', '-title']),
];
