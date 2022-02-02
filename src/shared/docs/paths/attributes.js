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
  },
};
