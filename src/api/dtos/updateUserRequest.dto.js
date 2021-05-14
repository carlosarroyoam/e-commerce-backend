const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  email: {
    isEmail: {
      bail: true,
    },
  },
});
