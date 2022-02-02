module.exports = {
  '/products/{product_id}/variants': {
    get: {
      tags: ['product-variant'],
      summary: 'Gets all product variants by product_id',
      operationId: 'getProductVariants',
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
  '/products/{product_id}/variants/{variant_id}': {
    get: {
      tags: ['product-variant'],
      summary: 'Gets a product variant by its id',
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
        {
          name: 'variant_id',
          in: 'path',
          description: 'ID of variant to query',
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
