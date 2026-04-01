import { Router } from 'express';

import defaultRoute from '#core/routes/default.routes.js';
import rootRoute from '#core/routes/root.routes.js';

import adminRoutes from '#features/admins/admin.routes.js';
import attributeRoutes from '#features/attributes/attribute.routes.js';
import authRoutes from '#features/auth/auth.routes.js';
import categoryRoutes from '#features/categories/category.routes.js';
import customerAddressesRoutes from '#features/customerAddresses/customerAddress.routes.js';
import customerRoutes from '#features/customers/customer.routes.js';
import orderRoutes from '#features/orders/order.routes.js';
import productRoutes from '#features/products/product.routes.js';
import productPropertyRoutes from '#features/productVariants/productVariant.routes.js';
import propertyRoutes from '#features/properties/property.routes.js';
import refundRoutes from '#features/refunds/refund.routes.js';
import shipmentRoutes from '#features/shipments/shipment.routes.js';
import userRoutes from '#features/users/user.routes.js';

export default () => {
  const router = Router();
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
  apiRouter.use('/orders', orderRoutes());
  apiRouter.use('/shipments', shipmentRoutes());
  apiRouter.use('/refunds', refundRoutes());

  router.use('/', rootRoute());
  router.use('/api/v1', apiRouter);
  router.use('*', defaultRoute());

  return router;
};
