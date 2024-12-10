export default {
  '/properties': {
    get: {
      tags: ['property'],
      summary: 'Gets all properties',
      operationId: 'getPropertys',
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/SizeParam' },
        { $ref: '#/components/parameters/PropertySortParam' },
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
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    post: {
      tags: ['property'],
      summary: 'Adds a new property',
      operationId: 'addProperty',
      requestBody: {
        description: 'property object that needs to be added',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddProperty',
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
  '/properties/{property_id}': {
    get: {
      tags: ['property'],
      summary: 'Gets a property by its id',
      operationId: 'getPropertyById',
      parameters: [
        {
          name: 'property_id',
          in: 'path',
          description: 'ID of property to query',
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
    put: {
      tags: ['property'],
      summary: 'Updates a Property by its id',
      operationId: 'updateProperty',
      parameters: [
        {
          name: 'property_id',
          in: 'path',
          description: 'ID of property to update',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      requestBody: {
        description: 'Property object that needs to be updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateProperty',
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
      tags: ['property'],
      summary: 'Deactivates a property by its id',
      operationId: 'deactivateProperty',
      parameters: [
        {
          name: 'property_id',
          in: 'path',
          description: 'ID of property to deactivate',
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
  '/properties/{property_id}/restore': {
    put: {
      tags: ['property'],
      summary: 'Restores a property by its id',
      operationId: 'restoreUser',
      parameters: [
        {
          name: 'property_id',
          in: 'path',
          description: 'ID of property to restore',
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
