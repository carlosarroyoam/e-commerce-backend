const { Router } = require('express');
const validateMiddleware = require('../middleware/validate.middleware');
const createUserDto = require('../dtos/user/create.dto');
const updateUserDto = require('../dtos/user/update.dto');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', userController.index.bind(userController));
  router.get('/:id', userController.show.bind(userController));
  router.post('/', validateMiddleware(createUserDto), userController.store.bind(userController));
  router.put('/:id', validateMiddleware(updateUserDto), userController.update.bind(userController));
  router.put('/:id/restore', userController.restore.bind(userController));
  router.delete('/:id', userController.destroy.bind(userController));

  return router;
};
