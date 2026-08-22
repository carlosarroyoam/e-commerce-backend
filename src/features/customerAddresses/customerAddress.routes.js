import { Router } from 'express';

import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';
import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import customerAddressController from '#features/customerAddresses/customerAddress.controller.js';

import deleteCustomerAddressSchema from './schemas/delete.schema.js';
import indexCustomerAddressSchema from './schemas/index.schema.js';
import showCustomerAddressSchema from './schemas/show.schema.js';
import storeCustomerAddressSchema from './schemas/store.schema.js';
import updateCustomerAddressSchema from './schemas/update.schema.js';

/**
 * Builds the router exposing the /customers/:customer_id/addresses endpoints.
 *
 * @return {Router} The configured express.js router.
 */
export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get(
    '/customers/:customer_id/addresses',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexCustomerAddressSchema),
    customerAddressController.index
  );

  router.get(
    '/customers/:customer_id/addresses/:address_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showCustomerAddressSchema),
    customerAddressController.show
  );

  router.post(
    '/customers/:customer_id/addresses',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeCustomerAddressSchema),
    customerAddressController.store
  );

  router.put(
    '/customers/:customer_id/addresses/:address_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateCustomerAddressSchema),
    customerAddressController.update
  );

  router.delete(
    '/customers/:customer_id/addresses/:address_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteCustomerAddressSchema),
    customerAddressController.destroy
  );

  return router;
};
