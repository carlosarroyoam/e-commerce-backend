import { Router } from 'express';

import customerController from '#features/customers/customer.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexCustomerSchema from './schemas/index.schema.js';
import showCustomerSchema from './schemas/show.schema.js';
import storeCustomerSchema from './schemas/store.schema.js';
import updateCustomerSchema from './schemas/update.schema.js';

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexCustomerSchema),
    adminGuardMiddleware,
    customerController.index
  );

  router.get(
    '/:customer_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showCustomerSchema),
    customerController.show
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeCustomerSchema),
    adminGuardMiddleware,
    customerController.store
  );

  router.put(
    '/:customer_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateCustomerSchema),
    customerController.update
  );

  return router;
};
