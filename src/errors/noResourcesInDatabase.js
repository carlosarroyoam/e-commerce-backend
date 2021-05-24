class NoResourcesInDatabaseError extends Error {
  constructor({ name }) {
    super(`Resource ${name} not found`);
    this.status = 404;
  }
}

module.exports = NoResourcesInDatabaseError;
