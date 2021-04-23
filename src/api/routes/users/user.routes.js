const { Router } = require('express');
const { validationResult } = require('express-validator');
const createUserRequest = require('../../requests/CreateUserRequest');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', userController.index);
  router.post('/', createUserRequest, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).send({ errors: errors.array() });
    }

    return response.send(request.body);
  });

  return router;
};
