module.exports = {
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
