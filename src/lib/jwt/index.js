const jwt = require('jsonwebtoken');

class JsonWebToken {
  constructor({ config }) {
    this.config = config;
    this.options = {
      expiresIn: '2d',
      issuer: this.config.APP_NAME,
    };
  }

  sign({ subject }) {
    const payload = {
      sub: subject,
    };

    const token = jwt.sign(
      payload,
      this.config.JWT.SECRET,
      this.options,
    );

    return token;
  }

  verify(accessToken) {
    return jwt.verify(accessToken, this.config.JWT.SECRET);
  }
}

module.exports = JsonWebToken;
