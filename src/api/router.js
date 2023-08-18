import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../common/docs/swagger.js';
import rootRoute from '../common/routes/root.routes.js';
import defaultRoute from '../common/routes/default.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/users/user.routes.js';
import adminRoutes from '../modules/admins/admin.routes.js';
import customerRoutes from '../modules/customers/customer.routes.js';
import customerAddressesRoutes from '../modules/customerAddresses/customerAddress.routes.js';
import productRoutes from '../modules/products/product.routes.js';
import productPropertyRoutes from '../modules/productVariants/productVariant.routes.js';
import attributeRoutes from '../modules/attributes/attribute.routes.js';
import propertyRoutes from '../modules/properties/property.routes.js';
import categoryRoutes from '../modules/categories/category.routes.js';

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
	apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

	router.use('/', rootRoute());
	router.use('/api/v1', apiRouter);
	router.use('*', defaultRoute());

	return router;
};
