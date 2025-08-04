import info from './info.js';
import servers from './servers.js';
import components from './components/index.js';
import tags from './tags.js';
import auth from './paths/auth.js';
import users from './paths/users.js';
import admins from './paths/admins.js';
import customers from './paths/customers.js';
import customersAddresses from './paths/customersAddresses.js';
import products from './paths/products.js';
import productVariants from './paths/productVariants.js';
import attributes from './paths/attributes.js';
import properties from './paths/properties.js';
import categories from './paths/categories.js';

export default {
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
