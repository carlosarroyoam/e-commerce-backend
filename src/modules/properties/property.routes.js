const { Router } = require('express');

const propertyController = require('./property.controller');

const verifyTokenMiddleware = require('../../common/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../common/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../common/middlewares/validateRequest.middleware');

const indexPropertySchema = require('./schemas/index.schema');
const showPropertySchema = require('./schemas/show.schema');
const storePropertySchema = require('./schemas/store.schema');
const updatePropertySchema = require('./schemas/update.schema');
const deletePropertySchema = require('./schemas/delete.schema');
const restorePropertySchema = require('./schemas/restore.schema');

module.exports = () => {
	// eslint-disable-next-line new-cap
	const router = Router();

	router.get(
		'/',
		verifyTokenMiddleware,
		validateRequestMiddleware(indexPropertySchema),
		adminGuardMiddleware,
		propertyController.index
	);

	router.get(
		'/:property_id',
		verifyTokenMiddleware,
		validateRequestMiddleware(showPropertySchema),
		adminGuardMiddleware,
		propertyController.show
	);

	router.post(
		'/',
		verifyTokenMiddleware,
		validateRequestMiddleware(storePropertySchema),
		adminGuardMiddleware,
		propertyController.store
	);

	router.put(
		'/:property_id',
		verifyTokenMiddleware,
		validateRequestMiddleware(updatePropertySchema),
		adminGuardMiddleware,
		propertyController.update
	);

	router.delete(
		'/:property_id',
		verifyTokenMiddleware,
		validateRequestMiddleware(deletePropertySchema),
		adminGuardMiddleware,
		propertyController.destroy
	);

	router.put(
		'/:property_id/restore',
		verifyTokenMiddleware,
		validateRequestMiddleware(restorePropertySchema),
		adminGuardMiddleware,
		propertyController.restore
	);

	return router;
};
