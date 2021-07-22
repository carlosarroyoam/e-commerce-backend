const { Router } = require('express');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');
const indexUserSchema = require('./schemas/index.schema');
const showUserSchema = require('./schemas/show.schema');
const deleteUserSchema = require('./schemas/delete.schema');
const restoreUserSchema = require('./schemas/restore.schema');
const changePasswordSchema = require('./schemas/changePassword.schema');

module.exports = ({ userController, verifyTokenMiddleware, adminGuardMiddleware }) => {
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
    adminGuardMiddleware,
    userController.restore.bind(userController)
  );

  router.delete(
    '/:userId',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteUserSchema),
    adminGuardMiddleware,
    userController.destroy.bind(userController)
  );

  return router;
};
