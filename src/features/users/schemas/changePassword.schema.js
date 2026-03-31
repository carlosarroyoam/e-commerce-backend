import validators from '#core/utils/validators.util.js';

export default [
  validators.password('current_password'),
  validators.password('new_password'),
  validators.confirmPassword('new_password', 'confirm_password'),
];
