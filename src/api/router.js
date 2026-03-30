import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import rootRoute from '#core/routes/root.routes.js';
import defaultRoute from '#core/routes/default.routes.js';

import authRoutes from '#features/auth/auth.routes.js';
import userRoutes from '#features/users/user.routes.js';
import adminRoutes from '#features/admins/admin.routes.js';
import customerRoutes from '#features/customers/customer.routes.js';
import customerAddressesRoutes from '#features/customerAddresses/customerAddress.routes.js';
import productRoutes from '#features/products/product.routes.js';
import productPropertyRoutes from '#features/productVariants/productVariant.routes.js';
import attributeRoutes from '#features/attributes/attribute.routes.js';
import propertyRoutes from '#features/properties/property.routes.js';
import categoryRoutes from '#features/categories/category.routes.js';

export default () => {
  // eslint-disable-next-line new-cap
  const router = Router();
  // eslint-disable-next-line new-cap
  const apiRouter = Router();

  apiRouter.use('/auth', authRoutes());
  apiRouter.use('/users', userRoutes());
  apiRouter.use('/admins', adminRoutes());
  apiRouter.use('/customers', customerRoutes());
  apiRouter.use('/', customerAddressesRoutes());
  apiRouter.use('/products', productRoutes());
  apiRouter.use('/', productPropertyRoutes());
  apiRouter.use('/attributes', attributeRoutes());
  apiRouter.use('/properties', propertyRoutes());
  apiRouter.use('/categories', categoryRoutes());
  apiRouter.use('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../docs/openapi/api-docs.yaml'));
  });

  router.use('/', rootRoute());
  router.use('/api/v1', apiRouter);
  router.use('*', defaultRoute());

  return router;
};
