import securitySchemas from './security-schemas.js';
import responses from './responses.js';
import parameters from './parameters.js';
import schemas from './schemas.js';

export default {
	components: {
		...securitySchemas,
		...responses,
		...parameters,
		...schemas,
	},
};
