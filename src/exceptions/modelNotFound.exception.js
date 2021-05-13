class ModelNotFoundException  extends Error {
  constructor(message, name) {
    super(message);
    this.name = `Resource ${name} not found`;
    this.status = 404;
  }
}

module.exports = ModelNotFoundException;
