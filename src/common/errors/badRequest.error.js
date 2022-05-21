/**
 * Error thrown when a user request has validation errors.
 */
class BadRequest extends Error {
  /**
   * Constructor for BadRequestError.
   *
   * @param {object} args The error args.
   * @param {string} args.message The error message.
   */
  constructor({ message }) {
    super(message || 'The request is not valid');
    this.name = 'Bad Request';
    this.status = 400;
  }
}

module.exports = BadRequest;
