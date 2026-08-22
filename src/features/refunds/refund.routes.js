import { Router } from 'express';

import adminGuard from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';
import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import RefundController from '#features/refunds/refund.controller.js';

import indexRefundSchema from './schemas/index.schema.js';
import showRefundSchema from './schemas/show.schema.js';
import showRefundByOrderSchema from './schemas/showByOrder.schema.js';
import storeRefundSchema from './schemas/store.schema.js';

/**
 * Builds the router exposing the /refunds endpoints.
 *
 * @return {Router} The configured express.js router.
 */
export default () => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexRefundSchema),
    adminGuard,
    RefundController.findAll
  );
  router.get(
    '/:refund_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showRefundSchema),
    adminGuard,
    RefundController.findById
  );
  router.get(
    '/order/:order_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showRefundByOrderSchema),
    RefundController.findByOrderId
  );
  router.post(
    '/order/:order_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeRefundSchema),
    adminGuard,
    RefundController.create
  );

  return router;
};
