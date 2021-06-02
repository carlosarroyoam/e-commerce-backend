const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jsonwebtoken = require('jsonwebtoken');

module.exports = ({ userService, bcrypt, config }) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.PASSPORT.SECRET,
  };

  passport.use(
    new Strategy(options, (payload, done) => {
      try {
        const userByEmail = userService.findByEmail(payload.email);

        if (!bcrypt.compare(payload.password, userByEmail.password)) {
          return done(null, false);
        }

        const jwt = jsonwebtoken.sign({
          iss: config.APP_NAME,
          sub: userByEmail.id,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 1),
        }, config.PASSPORT.SECRET);

        return done(null, jwt);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
