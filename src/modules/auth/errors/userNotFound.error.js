/**
 * Error thrown when a user is not found.
 */
class UserNotFoundError extends Error {
  /**
   * Constructor for UserNotFoundError.
   *
   * @param {object} data
   */
  constructor({ email = undefined }) {
    super(email ? `User with the email: ${email} was not found` : 'User not found');
    this.name = 'Not found';
    this.status = 404;
  }
}

module.exports = UserNotFoundError;
