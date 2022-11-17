module.exports = {
	securitySchemes: {
		BearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		},
	},
};
