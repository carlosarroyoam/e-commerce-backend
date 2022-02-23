/**
 * Error thrown when a internal server error occurs.
 */
class InternalServerError extends Error {
  /**
   * Constructor for InternalServerError.
   *
   * @param {object} args The error args.
   * @param {string} args.message The error message.
   */
  constructor({ message = undefined }) {
    super(message || 'Something went wrong');
    this.name = 'Internal server error';
    this.status = 500;
  }
}

module.exports = InternalServerError;
