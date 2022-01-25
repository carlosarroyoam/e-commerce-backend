module.exports = {
  '/customers': {
    get: {
      tags: ['customer'],
      summary: 'Gets all customers',
      operationId: 'getCustomers',
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
    post: {
      tags: ['customer'],
      summary: 'Adds a new customer',
      operationId: 'addCustomer',
      requestBody: {
        description: 'Customer object that needs to be added',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddCustomer',
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
    put: {
      tags: ['customer'],
      summary: 'Updates a customer by its id',
      operationId: 'updateCustomer',
      requestBody: {
        description: 'Customer object that needs to be updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateCustomer',
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
  '/customers/{customer_id}': {
    get: {
      tags: ['customer'],
      summary: 'Gets a customer by its id',
      operationId: 'getCustomerById',
      parameters: [
        {
          name: 'customer_id',
          in: 'path',
          description: 'ID of customer to query',
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
