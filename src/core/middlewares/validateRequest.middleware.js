import { validationResult } from 'express-validator';
import sharedErrors from '#core/errors/index.js';

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

export default validateRequest;
