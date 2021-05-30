class EmailAlreadyTakenError extends Error {
  constructor({ email }) {
    super(`The email address: ${email} is already in use`);
    this.name = 'Email not available';
    this.status = 302;
  }
}

module.exports = EmailAlreadyTakenError;
