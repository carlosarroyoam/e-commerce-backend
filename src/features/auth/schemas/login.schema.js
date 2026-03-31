import validators from '#core/utils/validators.util.js';

export default [
  validators.email('email'),
  validators.password('password'),
  validators.uuidInBody('device_fingerprint'),
];
