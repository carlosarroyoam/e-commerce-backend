/**
 * Error thrown when a user cannot be authenticated.
 */
class UnauthorizedError extends Error {
  /**
   * Constructor for UnauthorizedError.
   *
   * @param {object} args The error args.
   * @param {string} args.message The error message.
   * @param {object} args.email The email of the user.
   */
  constructor({ message, email }) {
    super(message || `Failed to authorize user with the email: ${email}`);
    this.name = 'Unauthorized';
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
