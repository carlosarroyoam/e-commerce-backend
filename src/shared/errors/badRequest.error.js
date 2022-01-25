/**
 * Error thrown when a user request has validation errors.
 */
class BadRequest extends Error {
  /**
   * Constructor for BadRequestError.
   *
   * @param {object} data
   */
  constructor({ message }) {
    super(message || 'Bad Request');
    this.name = 'Bad Request';
    this.status = 400;
  }
}

module.exports = BadRequest;
