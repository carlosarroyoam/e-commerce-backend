import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('category_id'),
  validators.textInBody('category_title', { min: 3, max: 45 }),
];
