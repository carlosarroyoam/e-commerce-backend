import { Router } from 'express';

import productVariantController from '#modules/productVariants/productVariant.controller.js';

import verifyTokenMiddleware from '#common/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#common/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#common/middlewares/validateRequest.middleware.js';

import indexProductVariantSchema from './schemas/index.schema.js';
import showProductVariantSchema from './schemas/show.schema.js';

export default () => {
	// eslint-disable-next-line new-cap
	const router = Router();

	router.get(
		'/products/:product_id/variants',
		validateRequestMiddleware(indexProductVariantSchema),
		productVariantController.index
	);

	router.get(
		'/products/:product_id/variants/:variant_id',
		validateRequestMiddleware(showProductVariantSchema),
		productVariantController.show
	);

	return router;
};
