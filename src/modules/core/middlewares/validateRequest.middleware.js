const { validationResult } = require('express-validator');
const BadRequestError = require('../errors/badRequest.error');

const errorFormatter = ({ msg }) => msg;

const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    const badRequestError = new BadRequestError({ errors: errors.mapped() });
    next(badRequestError);
    return;
  }

  next();
};

module.exports = validateRequest;
