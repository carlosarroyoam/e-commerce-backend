/**
 * Error thrown when a user cannot be authenticated.
 */
class ForbiddenError extends Error {
  /**
   * Constructor for ForbiddenError.
   *
   * @param {string} message The error message.
   */
  constructor(message = "You don't have access to this resource") {
    super(message);
    this.name = 'Forbidden';
    this.status = 403;
  }
}

export default ForbiddenError;
