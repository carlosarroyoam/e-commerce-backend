import validators from '#core/utils/validators.util.js';

export default [
  validators.password('password'),
  validators.confirmPassword('password', 'confirm_password'),
];
