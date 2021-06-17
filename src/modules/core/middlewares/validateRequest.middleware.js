const Validator = require('validatorjs');

module.exports = (rules, customMessages) => (req, res, next) => {
  const validation = new Validator(req.body, rules, customMessages);

  validation.passes(() => next());

  validation.fails(() => {
    res.status(400).send({
      message: 'Bad request',
      errors: validation.errors.errors,
    });
  });
};
