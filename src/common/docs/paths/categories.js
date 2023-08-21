export default {
	'/categories': {
		get: {
			tags: ['category'],
			summary: 'Gets all categories',
			operationId: 'getCategories',
			parameters: [
				{ $ref: '#/components/parameters/SkipParam' },
				{ $ref: '#/components/parameters/LimitParam' },
				{ $ref: '#/components/parameters/CategorySortParam' },
			],
			responses: {
				200: {
					$ref: '#/components/responses/OK',
				},
				422: {
					$ref: '#/components/responses/UNPROCESSABLE_ENTITY',
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
		},
		post: {
			tags: ['category'],
			summary: 'Adds a new category',
			operationId: 'addCategory',
			requestBody: {
				description: 'category object that needs to be added',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/AddCategory',
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
					$ref: '#/components/responses/UNPROCESSABLE_ENTITY',
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
	'/categories/{category_id}': {
		get: {
			tags: ['category'],
			summary: 'Gets a category by its id',
			operationId: 'getCategoryById',
			parameters: [
				{
					name: 'category_id',
					in: 'path',
					description: 'ID of category to query',
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
				201: {
					$ref: '#/components/responses/CREATED',
				},
				422: {
					$ref: '#/components/responses/UNPROCESSABLE_ENTITY',
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
		},
		put: {
			tags: ['category'],
			summary: 'Updates a category by its id',
			operationId: 'updateCategory',
			parameters: [
				{
					name: 'category_id',
					in: 'path',
					description: 'ID of category to update',
					required: true,
					schema: {
						type: 'integer',
						format: 'int64',
					},
				},
			],
			requestBody: {
				description: 'category object that needs to be updated',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/UpdateCategory',
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
					$ref: '#/components/responses/UNPROCESSABLE_ENTITY',
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
			tags: ['category'],
			summary: 'Deactivates a category by its id',
			operationId: 'deactivateCategory',
			parameters: [
				{
					name: 'category_id',
					in: 'path',
					description: 'ID of category to deactivate',
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
					$ref: '#/components/responses/UNPROCESSABLE_ENTITY',
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
	'/categories/{category_id}/restore': {
		put: {
			tags: ['category'],
			summary: 'Restores a category by its id',
			operationId: 'restoreCategory',
			parameters: [
				{
					name: 'category_id',
					in: 'path',
					description: 'ID of category to restore',
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
					$ref: '#/components/responses/UNPROCESSABLE_ENTITY',
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
