const securitySchemas = require('./security-schemas');
const responses = require('./responses');
const parameters = require('./parameters');
const schemas = require('./schemas');

module.exports = {
	components: {
		...securitySchemas,
		...responses,
		...parameters,
		...schemas,
	},
};
