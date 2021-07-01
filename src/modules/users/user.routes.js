const { Router } = require('express');

module.exports = ({ userController, verifyTokenMiddleware }) => {
  const router = Router();

  router.get('/', userController.index.bind(userController));
  router.get('/:userId', verifyTokenMiddleware, userController.show.bind(userController));
  router.put('/:userId/restore', verifyTokenMiddleware, userController.restore.bind(userController));
  router.delete('/:userId', verifyTokenMiddleware, userController.destroy.bind(userController));

  return router;
};
