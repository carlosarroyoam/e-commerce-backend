import { Router } from 'express';

import userController from '#modules/users/user.controller.js';

import verifyTokenMiddleware from '#common/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#common/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#common/middlewares/validateRequest.middleware.js';

import indexUserSchema from './schemas/index.schema.js';
import showUserSchema from './schemas/show.schema.js';
import deleteUserSchema from './schemas/delete.schema.js';
import restoreUserSchema from './schemas/restore.schema.js';
import changePasswordSchema from './schemas/changePassword.schema.js';

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexUserSchema),
    adminGuardMiddleware,
    userController.index
  );

  router.get(
    '/:user_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showUserSchema),
    adminGuardMiddleware,
    userController.show
  );

  router.put(
    '/:user_id/change-password',
    verifyTokenMiddleware,
    validateRequestMiddleware(changePasswordSchema),
    adminGuardMiddleware,
    userController.changePassword
  );

  router.delete(
    '/:user_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteUserSchema),
    adminGuardMiddleware,
    userController.destroy
  );

  router.put(
    '/:user_id/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreUserSchema),
    adminGuardMiddleware,
    userController.restore
  );

  return router;
};
