import { Router } from 'express';

import OrderController from '#features/orders/order.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexOrderSchema from './schemas/index.schema.js';
import showOrderSchema from './schemas/show.schema.js';
import trackOrderSchema from './schemas/track.schema.js';
import storeOrderSchema from './schemas/store.schema.js';
import updateStatusOrderSchema from './schemas/updateStatus.schema.js';
import updatePaymentStatusOrderSchema from './schemas/updatePaymentStatus.schema.js';

export default () => {
  const router = Router();

  router.get('/', verifyTokenMiddleware, validateRequestMiddleware(indexOrderSchema), OrderController.findAll);
  router.get(
    '/track/:orderNumber',
    verifyTokenMiddleware,
    validateRequestMiddleware(trackOrderSchema),
    OrderController.track
  );
  router.get(
    '/:order_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showOrderSchema),
    OrderController.findById
  );
  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeOrderSchema),
    OrderController.create
  );
  router.patch(
    '/:order_id/status',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateStatusOrderSchema),
    adminGuardMiddleware,
    OrderController.updateStatus
  );
  router.patch(
    '/:order_id/payment-status',
    verifyTokenMiddleware,
    validateRequestMiddleware(updatePaymentStatusOrderSchema),
    adminGuardMiddleware,
    OrderController.updatePaymentStatus
  );

  return router;
};
