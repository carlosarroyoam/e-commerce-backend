const Validator = require('validatorjs');
const BadRequestError = require('../errors/badRequest.error');

module.exports = (rules, customMessages) => (req, res, next) => {
  const validation = new Validator(req.body, rules, customMessages);

  validation.passes(() => next());

  validation.fails(() => {
    const badRequestError = new BadRequestError({ errors: validation.errors.errors });
    next(badRequestError);
  });
};
