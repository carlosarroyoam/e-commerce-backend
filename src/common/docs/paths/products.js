export default {
	'/products': {
		get: {
			tags: ['product'],
			summary: 'Gets all products',
			operationId: 'getProducts',
			parameters: [
				{ $ref: '#/components/parameters/SkipParam' },
				{ $ref: '#/components/parameters/LimitParam' },
				{ $ref: '#/components/parameters/ProductSortParam' },
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
		},
	},
	'/products/{product_id}': {
		get: {
			tags: ['product'],
			summary: 'Gets a product by its id',
			operationId: 'getProductById',
			parameters: [
				{
					name: 'product_id',
					in: 'path',
					description: 'ID of product to query',
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
		},
	},
};
