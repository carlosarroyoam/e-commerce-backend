import { Router } from 'express';

import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';
import productVariantController from '#features/productVariants/productVariant.controller.js';

import indexProductVariantSchema from './schemas/index.schema.js';
import showProductVariantSchema from './schemas/show.schema.js';

/**
 * Builds the router exposing the /products/:product_id/variants endpoints.
 *
 * @return {Router} The configured express.js router.
 */
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
