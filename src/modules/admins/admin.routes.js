import { Router } from 'express';

import adminController from '#modules/admins/admin.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexAdminSchema from './schemas/index.schema.js';
import showAdminSchema from './schemas/show.schema.js';
import storeAdminSchema from './schemas/store.schema.js';
import updateAdminSchema from './schemas/update.schema.js';

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexAdminSchema),
    adminGuardMiddleware,
    adminController.index
  );

  router.get(
    '/:admin_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showAdminSchema),
    adminGuardMiddleware,
    adminController.show
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeAdminSchema),
    adminGuardMiddleware,
    adminController.store
  );

  router.put(
    '/:admin_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateAdminSchema),
    adminGuardMiddleware,
    adminController.update
  );

  return router;
};
