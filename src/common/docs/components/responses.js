module.exports = {
	responses: {
		OK: {
			description: 'OK',
			content: {
				'application/json': {
					schema: {
						example: {
							message: 'Ok',
						},
					},
				},
			},
		},
		CREATED: {
			description: 'CREATED',
			content: {
				'application/json': {
					schema: {
						example: {
							message: 'Ok',
						},
					},
				},
			},
		},
		NO_CONTENT: {
			description: 'NO_CONTENT',
		},
		BAD_REQUEST: {
			description: 'BAD_REQUEST',
			content: {
				'application/json': {
					schema: {
						example: {
							error: 'Bad request',
							message: 'The request is not valid',
							status: 400,
							path: '/api/v1/users',
							timestamp: '2022-05-26T22:06:12.887Z',
						},
					},
				},
			},
		},
		NOT_FOUND: {
			description: 'NOT_FOUND',
			content: {
				'application/json': {
					schema: {
						example: {
							error: 'Not found',
							message: 'The /api/v1/wrong-route route was not found on this server',
							status: 404,
							path: '/api/v1/users',
							timestamp: '2022-05-26T22:06:12.887Z',
						},
					},
				},
			},
		},
		UNAUTHORIZED: {
			description: 'UNAUTHORIZED',
			content: {
				'application/json': {
					schema: {
						example: {
							error: 'Unauthorized',
							message: "Failed to authorize user with the email: 'example@domain.com'",
							status: 401,
							path: '/api/v1/users',
							timestamp: '2022-05-26T22:06:12.887Z',
						},
					},
				},
			},
		},
		FORBIDDEN: {
			description: 'FORBIDDEN',
			content: {
				'application/json': {
					schema: {
						example: {
							error: 'Forbidden',
							message: 'The user has not permission to perform this action',
							status: 403,
							path: '/api/v1/users',
							timestamp: '2022-05-26T22:06:12.887Z',
						},
					},
				},
			},
		},
		UNPROCESSABLE_ENTITY: {
			description: 'UNPROCESSABLE_ENTITY',
			content: {
				'application/json': {
					schema: {
						example: {
							error: 'Unprocessable entity',
							message: 'The request data is not valid',
							details: {
								password: 'The password must be between 8 and 16 characters',
								email: 'The email format is invalid',
							},
							status: 422,
							path: '/api/v1/users',
							timestamp: '2022-05-26T22:06:12.887Z',
						},
					},
				},
			},
		},
		INTERNAL_SERVER_ERROR: {
			description: 'INTERNAL_SERVER_ERROR',
			content: {
				'application/json': {
					schema: {
						example: {
							error: 'Internal server error',
							message: 'Error while updating information',
							status: 500,
							path: '/api/v1/users',
							timestamp: '2022-05-26T22:06:12.887Z',
						},
					},
				},
			},
		},
	},
};
