import { Router } from 'express';

import propertyController from '#modules/properties/property.controller.js';

import verifyTokenMiddleware from '#common/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#common/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#common/middlewares/validateRequest.middleware.js';

import indexPropertySchema from './schemas/index.schema.js';
import showPropertySchema from './schemas/show.schema.js';
import storePropertySchema from './schemas/store.schema.js';
import updatePropertySchema from './schemas/update.schema.js';
import deletePropertySchema from './schemas/delete.schema.js';
import restorePropertySchema from './schemas/restore.schema.js';

export default () => {
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
