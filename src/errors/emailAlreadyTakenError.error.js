class EmailAlreadyTakenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Email already taken by another user';
    this.status = 400;
  }
}

module.exports = EmailAlreadyTakenError;
