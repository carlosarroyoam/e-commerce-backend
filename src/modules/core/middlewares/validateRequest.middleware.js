const { validationResult } = require('express-validator');
const UnprocessableEntity = require('../errors/unprocessableEntity.error');

const errorFormatter = ({ msg }) => msg;

const validateRequest = (validations) => async (request, response, next) => {
  await Promise.all(validations.map((validation) => validation.run(request)));

  const errors = validationResult(request).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    const UnprocessableEntityError = new UnprocessableEntity({
      errors: errors.mapped(),
    });
    next(UnprocessableEntityError);
    return;
  }

  next();
};

module.exports = validateRequest;
