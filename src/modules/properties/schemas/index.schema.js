import validators from '#common/utils/validators.util.js';

export default [
  validators.sort(['id', '-id', 'title', '-title']),
  validators.skip,
  validators.limit,
];
