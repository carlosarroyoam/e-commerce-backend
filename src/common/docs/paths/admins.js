module.exports = {
	'/admins': {
		get: {
			tags: ['admin'],
			summary: 'Gets all admins',
			operationId: 'getAdmins',
			parameters: [
				{ $ref: '#/components/parameters/SkipParam' },
				{ $ref: '#/components/parameters/LimitParam' },
				{ $ref: '#/components/parameters/UserSortParam' },
				{ $ref: '#/components/parameters/UserStatusParam' },
				{ $ref: '#/components/parameters/SearchParam' },
			],
			responses: {
				200: {
					$ref: '#/components/responses/OK',
				},
				422: {
					$ref: '#/components/responses/UNPROCESABLE_ENTITY',
				},
				401: {
					$ref: '#/components/responses/UNAUTHORIZED',
				},
				403: {
					$ref: '#/components/responses/FORBIDDEN',
				},
				500: {
					$ref: '#/components/responses/INTERNAL_SERVER_ERROR',
				},
			},
			security: [
				{
					BearerAuth: [],
				},
			],
		},
		post: {
			tags: ['admin'],
			summary: 'Adds a new admin',
			operationId: 'addAdmin',
			requestBody: {
				description: 'Admin object that needs to be added',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/AddAdmin',
						},
					},
				},
				required: true,
			},
			responses: {
				200: {
					$ref: '#/components/responses/OK',
				},
				201: {
					$ref: '#/components/responses/CREATED',
				},
				422: {
					$ref: '#/components/responses/UNPROCESABLE_ENTITY',
				},
				401: {
					$ref: '#/components/responses/UNAUTHORIZED',
				},
				403: {
					$ref: '#/components/responses/FORBIDDEN',
				},
				500: {
					$ref: '#/components/responses/INTERNAL_SERVER_ERROR',
				},
			},
			security: [
				{
					BearerAuth: [],
				},
			],
		},
		put: {
			tags: ['admin'],
			summary: 'Updates a admin by its id',
			operationId: 'updateAdmin',
			requestBody: {
				description: 'Admin object that needs to be updated',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/UpdateAdmin',
						},
					},
				},
				required: true,
			},
			responses: {
				200: {
					$ref: '#/components/responses/OK',
				},
				422: {
					$ref: '#/components/responses/UNPROCESABLE_ENTITY',
				},
				401: {
					$ref: '#/components/responses/UNAUTHORIZED',
				},
				403: {
					$ref: '#/components/responses/FORBIDDEN',
				},
				404: {
					$ref: '#/components/responses/NOT_FOUND',
				},
				500: {
					$ref: '#/components/responses/INTERNAL_SERVER_ERROR',
				},
			},
			security: [
				{
					BearerAuth: [],
				},
			],
		},
	},
	'/admins/{admin_id}': {
		get: {
			tags: ['admin'],
			summary: 'Gets a admin by its id',
			operationId: 'getAdminById',
			parameters: [
				{
					name: 'admin_id',
					in: 'path',
					description: 'ID of admin to query',
					required: true,
					schema: {
						type: 'integer',
						format: 'int64',
					},
				},
			],
			responses: {
				200: {
					$ref: '#/components/responses/OK',
				},
				422: {
					$ref: '#/components/responses/UNPROCESABLE_ENTITY',
				},
				401: {
					$ref: '#/components/responses/UNAUTHORIZED',
				},
				403: {
					$ref: '#/components/responses/FORBIDDEN',
				},
				404: {
					$ref: '#/components/responses/NOT_FOUND',
				},
				500: {
					$ref: '#/components/responses/INTERNAL_SERVER_ERROR',
				},
			},
			security: [
				{
					BearerAuth: [],
				},
			],
		},
	},
};
