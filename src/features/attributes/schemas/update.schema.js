import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('attribute_id'),
  validators.textInBody('title', { min: 3, max: 45 }),
];
