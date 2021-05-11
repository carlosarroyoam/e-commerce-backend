class EmailAddressNotAvailableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Email already taken by another user';
    this.status = 401;
  }
}

module.exports = EmailAddressNotAvailableError;
