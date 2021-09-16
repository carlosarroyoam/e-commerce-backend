const { Router } = require('express');

const userController = require('./user.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexUserSchema = require('./schemas/index.schema');
const showUserSchema = require('./schemas/show.schema');
const deleteUserSchema = require('./schemas/delete.schema');
const restoreUserSchema = require('./schemas/restore.schema');
const changePasswordSchema = require('./schemas/changePassword.schema');

module.exports = () => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexUserSchema),
    userController.index
  );

  router.get(
    '/:user_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showUserSchema),
    userController.show
  );

  router.put(
    '/:user_id/change-password',
    verifyTokenMiddleware,
    validateRequestMiddleware(changePasswordSchema),
    userController.changePassword
  );

  router.put(
    '/:user_id/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreUserSchema),
    adminGuardMiddleware,
    userController.restore
  );

  router.delete(
    '/:user_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteUserSchema),
    adminGuardMiddleware,
    userController.destroy
  );

  return router;
};
