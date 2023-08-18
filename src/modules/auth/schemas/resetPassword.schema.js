import validators from '../../../common/utils/validators.util.js';

export default [validators.password, validators.confirmPassword('password')];
