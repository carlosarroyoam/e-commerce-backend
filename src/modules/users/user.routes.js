const { Router } = require('express');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', userController.index.bind(userController));
  router.get('/:id', userController.show.bind(userController));
  router.put('/:id/restore', userController.restore.bind(userController));
  router.delete('/:id', userController.destroy.bind(userController));

  return router;
};
