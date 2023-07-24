const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const auth = require('./paths/auth');
const users = require('./paths/users');
const admins = require('./paths/admins');
const customers = require('./paths/customers');
const customersAddresses = require('./paths/customersAddresses');
const products = require('./paths/products');
const productVariants = require('./paths/productVariants');
const attributes = require('./paths/attributes');
const properties = require('./paths/properties');
const categories = require('./paths/categories');

module.exports = {
	...info,
	...servers,
	...tags,
	paths: {
		...auth,
		...users,
		...admins,
		...customers,
		...customersAddresses,
		...products,
		...productVariants,
		...attributes,
		...properties,
		...categories,
	},
	...components,
};
