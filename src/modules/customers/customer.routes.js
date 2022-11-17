const { Router } = require('express');

const customerController = require('./customer.controller');

const verifyTokenMiddleware = require('../../common/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../common/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../common/middlewares/validateRequest.middleware');

const indexCustomerSchema = require('./schemas/index.schema');
const showCustomerSchema = require('./schemas/show.schema');
const storeCustomerSchema = require('./schemas/store.schema');
const updateCustomerSchema = require('./schemas/update.schema');

module.exports = () => {
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
