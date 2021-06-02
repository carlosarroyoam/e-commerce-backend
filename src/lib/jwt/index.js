const jwt = require('jsonwebtoken');

class JsonWebToken {
  constructor({ config }) {
    this._config = config;
  }

  sign({ subscriberId }) {
    const token = jwt.sign({
      iss: this._config.APP_NAME,
      sub: subscriberId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    }, this._config.PASSPORT.SECRET);

    return token;
  }

  verify(accessToken) {
    return jwt.verify(accessToken, this._config.PASSPORT.SECRET);
  }
}

module.exports = JsonWebToken;
