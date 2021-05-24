class EmailAlreadyTakenError extends Error {
  constructor({ email }) {
    super(`The email address: ${email} is already in use`);
    this.name = 'Email already taken by another user';
    this.status = 400;
  }
}

module.exports = EmailAlreadyTakenError;
