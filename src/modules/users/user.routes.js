const { Router } = require('express');
const validateRequestMiddleware = require('../core/middlewares/validateRequest.middleware');
const indexUserSchema = require('./schemas/index.schema');
const showUserSchema = require('./schemas/show.schema');
const deleteUserSchema = require('./schemas/delete.schema');
const restoreUserSchema = require('./schemas/restore.schema');
const changePasswordSchema = require('./schemas/changePassword.schema');

module.exports = ({ userController, verifyTokenMiddleware }) => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexUserSchema),
    userController.index.bind(userController)
  );

  router.get(
    '/:userId',
    verifyTokenMiddleware,
    validateRequestMiddleware(showUserSchema),
    userController.show.bind(userController)
  );

  router.put(
    '/:userId/change-password',
    verifyTokenMiddleware,
    validateRequestMiddleware(changePasswordSchema),
    userController.changePassword.bind(userController)
  );

  router.put(
    '/:userId/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreUserSchema),
    userController.restore.bind(userController)
  );

  router.delete(
    '/:userId',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteUserSchema),
    userController.destroy.bind(userController)
  );

  return router;
};
