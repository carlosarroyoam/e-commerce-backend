const { Router } = require('express');
const passport = require('passport');

module.exports = ({ authController }) => {
  const router = Router();

  router.post('/login', passport.authenticate('jwt', { session: false }), authController.login.bind(authController));

  return router;
};
