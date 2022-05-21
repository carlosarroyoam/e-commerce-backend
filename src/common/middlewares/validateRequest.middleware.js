const { validationResult } = require('express-validator');
const sharedErrors = require('../errors');

const errorFormatter = ({ msg }) => msg;

const validateRequest = (validations) => async (request, response, next) => {
  await Promise.all(validations.map((validation) => validation.run(request)));

  const errors = validationResult(request).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    const unprocessableEntityError = new sharedErrors.UnprocessableEntityError({
      message: undefined,
      errors: errors.mapped(),
    });

    return next(unprocessableEntityError);
  }

  next();
};

module.exports = validateRequest;
