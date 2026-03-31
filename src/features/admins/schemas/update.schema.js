import validators from '#core/utils/validators.util.js';

export default [
  validators.resourceId('admin_id'),
  validators.textInBody('first_name', { min: 5, max: 50 }),
  validators.textInBody('last_name', { min: 5, max: 50 }),
];
