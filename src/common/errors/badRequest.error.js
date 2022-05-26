/**
 * Error thrown when a user request has validation errors.
 */
class BadRequest extends Error {
  /**
   * Constructor for BadRequestError.
   *
   * @param {string} message The error message.
   */
  constructor(message = 'The request is not valid') {
    super(message);
    this.name = 'Bad Request';
    this.status = 400;
  }
}

module.exports = BadRequest;
