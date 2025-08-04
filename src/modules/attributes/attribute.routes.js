import { Router } from 'express';

import attributeController from '#modules/attributes/attribute.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexAttributeSchema from './schemas/index.schema.js';
import showAttributeSchema from './schemas/show.schema.js';
import storeAttributeSchema from './schemas/store.schema.js';
import updateAttributeSchema from './schemas/update.schema.js';
import deleteAttributeSchema from './schemas/delete.schema.js';
import restoreAttributeSchema from './schemas/restore.schema.js';

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexAttributeSchema),
    adminGuardMiddleware,
    attributeController.index
  );

  router.get(
    '/:attribute_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showAttributeSchema),
    adminGuardMiddleware,
    attributeController.show
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeAttributeSchema),
    adminGuardMiddleware,
    attributeController.store
  );

  router.put(
    '/:attribute_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateAttributeSchema),
    adminGuardMiddleware,
    attributeController.update
  );

  router.delete(
    '/:attribute_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteAttributeSchema),
    adminGuardMiddleware,
    attributeController.destroy
  );

  router.put(
    '/:attribute_id/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreAttributeSchema),
    adminGuardMiddleware,
    attributeController.restore
  );

  return router;
};
