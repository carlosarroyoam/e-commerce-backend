import validators from '../../../common/utils/validators.util.js';

export default [
	validators.firstName,

	validators.lastName,

	validators.email,

	validators.password,

	validators.confirmPassword('password'),
];
