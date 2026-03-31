import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('property_id'),
  validators.textInBody('property_title', { min: 3, max: 45 }),
];
