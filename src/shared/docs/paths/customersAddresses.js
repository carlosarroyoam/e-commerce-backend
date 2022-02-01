module.exports = {
  '/customers/{customer_id}/addresses': {
    get: {
      tags: ['customer-address'],
      summary: 'Gets all customer addresses',
      operationId: 'getCustomerAddresses',
      parameters: [
        {
          name: 'customer_id',
          in: 'path',
          description: 'ID of the customer to retrieve its addresses',
          schema: {
            type: 'integer',
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
    post: {
      tags: ['customer-address'],
      summary: 'Adds a new customer address',
      operationId: 'addCustomerAddress',
      parameters: [
        {
          name: 'customer_id',
          in: 'path',
          description: 'ID of the customer to retrieve its addresses',
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        description: 'Address object that needs to be added',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddCustomerAddress',
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
  },
  '/customers/{customer_id}/addresses/{address_id}': {
    get: {
      tags: ['customer-address'],
      summary: 'Gets a customer address by its id',
      operationId: 'getCustomerAddressById',
      parameters: [
        {
          name: 'customer_id',
          in: 'path',
          description: 'ID of the customer to query',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
        {
          name: 'address_id',
          in: 'path',
          description: 'ID of the address to query',
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
      tags: ['customer-address'],
      summary: 'Updates a customer address by its id',
      operationId: 'updateCustomerAddressById',
      parameters: [
        {
          name: 'customer_id',
          in: 'path',
          description: 'ID of the customer to query',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
        {
          name: 'address_id',
          in: 'path',
          description: 'ID of the address to query',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      requestBody: {
        description: 'Address object that needs to be updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateCustomerAddress',
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
    delete: {
      tags: ['customer-address'],
      summary: 'Deletes a customer address by its id',
      operationId: 'getCustomerById',
      parameters: [
        {
          name: 'customer_id',
          in: 'path',
          description: 'ID of the customer to query',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
        {
          name: 'address_id',
          in: 'path',
          description: 'ID of the address to query',
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
