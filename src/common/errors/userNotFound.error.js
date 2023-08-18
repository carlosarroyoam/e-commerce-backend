/**
 * Error thrown when a user is not found.
 */
class UserNotFoundError extends Error {
	/**
	 * Constructor for UserNotFoundError.
	 *
	 * @param {object} args The error args.
	 * @param {string} args.email The email of the user.
	 */
	constructor({ email }) {
		super(email ? `User with the email: '${email}' was not found` : 'The user was not found');
		this.name = 'Not found';
		this.status = 404;
	}
}

export default UserNotFoundError;
