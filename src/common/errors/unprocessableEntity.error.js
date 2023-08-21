/**
 * Error thrown when a user request has validation errors.
 */
class UnprocessableEntity extends Error {
	/**
	 * Constructor for UnprocessableEntityError.
	 *
	 * @param {object} args The error args.
	 * @param {string} args.message The error message.
	 * @param {object} args.errors The errors object.
	 */
	constructor({ message, errors }) {
		super(message || 'The request data is not valid');
		this.name = 'Unprocessable entity';
		this.status = 422;
		this.errors = errors;
	}
}

export default UnprocessableEntity;
