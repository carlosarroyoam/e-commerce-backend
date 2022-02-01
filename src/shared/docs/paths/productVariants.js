module.exports = {
  '/product/{product_id}/variants': {
    get: {
      tags: ['product-variant'],
      summary: 'Gets all product variants by product_id',
      operationId: 'getProductVariants',
      parameters: [
        { $ref: '#/components/parameters/SkipParam' },
        { $ref: '#/components/parameters/LimitParam' },
        { $ref: '#/components/parameters/SortParam' },
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
