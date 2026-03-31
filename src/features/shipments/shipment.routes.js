import { Router } from 'express';

import ShipmentController from '#features/shipments/shipment.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuard from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexShipmentSchema from './schemas/index.schema.js';
import showShipmentSchema from './schemas/show.schema.js';
import showShipmentByOrderSchema from './schemas/showByOrder.schema.js';
import storeShipmentSchema from './schemas/store.schema.js';
import updateDeliveredShipmentSchema from './schemas/updateDelivered.schema.js';

export default () => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexShipmentSchema),
    adminGuard,
    ShipmentController.findAll
  );
  router.get('/carriers', verifyTokenMiddleware, ShipmentController.getCarriers);
  router.get(
    '/:shipment_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showShipmentSchema),
    ShipmentController.findById
  );
  router.get(
    '/order/:order_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showShipmentByOrderSchema),
    ShipmentController.findByOrderId
  );
  router.post(
    '/:order_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeShipmentSchema),
    adminGuard,
    ShipmentController.create
  );
  router.patch(
    '/:shipment_id/delivered',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateDeliveredShipmentSchema),
    adminGuard,
    ShipmentController.markDelivered
  );

  return router;
};
