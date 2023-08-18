import validators from '../../../common/utils/validators.util.js';

export default [
	validators.currentPassword,

	validators.newPassword,

	validators.confirmPassword('new_password'),
];
