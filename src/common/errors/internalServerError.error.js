/**
 * Error thrown when a internal server error occurs.
 */
class InternalServerError extends Error {
  /**
   * Constructor for InternalServerError.
   *
   * @param {string} message The error message.
   */
  constructor(message = 'Something went wrong') {
    super(message);
    this.name = 'Internal server error';
    this.status = 500;
  }
}

export default InternalServerError;
