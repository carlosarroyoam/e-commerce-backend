import { Router } from 'express';

import categoryController from '#modules/categories/category.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexCategorySchema from './schemas/index.schema.js';
import showCategorySchema from './schemas/show.schema.js';
import storeCategorySchema from './schemas/store.schema.js';
import updateCategorySchema from './schemas/update.schema.js';
import deleteCategorySchema from './schemas/delete.schema.js';
import restoreCategorySchema from './schemas/restore.schema.js';

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get('/', validateRequestMiddleware(indexCategorySchema), categoryController.index);

  router.get(
    '/:category_id',
    validateRequestMiddleware(showCategorySchema),
    categoryController.show
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeCategorySchema),
    adminGuardMiddleware,
    categoryController.store
  );

  router.put(
    '/:category_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateCategorySchema),
    adminGuardMiddleware,
    categoryController.update
  );

  router.delete(
    '/:category_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteCategorySchema),
    adminGuardMiddleware,
    categoryController.destroy
  );

  router.put(
    '/:category_id/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreCategorySchema),
    adminGuardMiddleware,
    categoryController.restore
  );

  return router;
};
