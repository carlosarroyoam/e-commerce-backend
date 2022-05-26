/**
 * Error thrown when a resource is not found.
 */
class ResourceNotFoundError extends Error {
  /**
   * Constructor for ResourceNotFoundError.
   *
   * @param {string} message The error message.
   */
  constructor(message = 'The resource was not found') {
    super(message);
    this.name = 'Not found';
    this.status = 404;
  }
}

module.exports = ResourceNotFoundError;
