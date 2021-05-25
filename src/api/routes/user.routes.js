const { Router } = require('express');
const validate = require('../middleware/validate.middleware');
const createUserDto = require('../dtos/user/create.dto');
const updateUserDto = require('../dtos/user/update.dto');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', userController.index.bind(userController));
  router.get('/:id', userController.show.bind(userController));
  router.post('/', validate(createUserDto), userController.store.bind(userController));
  router.put('/:id', validate(updateUserDto), userController.update.bind(userController));
  router.delete('/:id', userController.destroy.bind(userController));

  return router;
};
