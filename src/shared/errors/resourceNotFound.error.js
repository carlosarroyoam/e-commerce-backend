/**
 * Error thrown when a resource is not found.
 */
class ResourceNotFoundError extends Error {
  /**
   * Constructor for ResourceNotFoundError.
   *
   */
  constructor() {
    super('The resource was not found');
    this.name = 'Not found';
    this.status = 404;
  }
}

module.exports = ResourceNotFoundError;
