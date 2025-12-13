import validators from '#core/utils/validators.util.js';

export default [
  validators.currentPassword,

  validators.newPassword,

  validators.confirmPassword('new_password'),
];
