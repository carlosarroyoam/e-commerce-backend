module.exports = {
	'/attributes': {
		get: {
			tags: ['attribute'],
			summary: 'Gets all attributes',
			operationId: 'getAttributes',
			parameters: [
				{ $ref: '#/components/parameters/SkipParam' },
				{ $ref: '#/components/parameters/LimitParam' },
				{ $ref: '#/components/parameters/AttributeSortParam' },
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
			tags: ['attribute'],
			summary: 'Adds a new attribute',
			operationId: 'addAttribute',
			requestBody: {
				description: 'attribute object that needs to be added',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/AddAttribute',
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
	},
	'/attributes/{attribute_id}': {
		get: {
			tags: ['attribute'],
			summary: 'Gets a attribute by its id',
			operationId: 'getAttributeById',
			parameters: [
				{
					name: 'attribute_id',
					in: 'path',
					description: 'ID of attribute to query',
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
		put: {
			tags: ['attribute'],
			summary: 'Updates a Attribute by its id',
			operationId: 'updateAttribute',
			parameters: [
				{
					name: 'attribute_id',
					in: 'path',
					description: 'ID of attribute to update',
					required: true,
					schema: {
						type: 'integer',
						format: 'int64',
					},
				},
			],
			requestBody: {
				description: 'Attribute object that needs to be updated',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/UpdateAttribute',
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
		delete: {
			tags: ['attribute'],
			summary: 'Deactivates a attribute by its id',
			operationId: 'deactivateAttribute',
			parameters: [
				{
					name: 'attribute_id',
					in: 'path',
					description: 'ID of attribute to deactivate',
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
	'/attributes/{attribute_id}/restore': {
		put: {
			tags: ['attribute'],
			summary: 'Restores a attribute by its id',
			operationId: 'restoreUser',
			parameters: [
				{
					name: 'attribute_id',
					in: 'path',
					description: 'ID of attribute to restore',
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
