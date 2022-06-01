const { Router } = require('express');

const customerAddressController = require('./customerAddress.controller');

const verifyTokenMiddleware = require('../../common/middlewares/verifyToken.middleware');
const validateRequestMiddleware = require('../../common/middlewares/validateRequest.middleware');

const indexCustomerAddressSchema = require('./schemas/index.schema');
const showCustomerAddressSchema = require('./schemas/show.schema');
const storeCustomerAddressSchema = require('./schemas/store.schema');
const updateCustomerAddressSchema = require('./schemas/update.schema');
const deleteCustomerAddressSchema = require('./schemas/delete.schema');

module.exports = () => {
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
