module.exports = {
  '/auth/login': {
    post: {
      tags: ['auth'],
      summary: 'Authenticates a user',
      operationId: 'authLogin',
      requestBody: {
        description: 'User credentials object that will be authenticated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserCredentials',
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
        500: {
          $ref: '#/components/responses/INTERNAL_SERVER_ERROR',
        },
      },
    },
  },
  '/auth/logout': {
    post: {
      tags: ['auth'],
      summary: 'Revokes a refresh token',
      operationId: 'authLogout',
      responses: {
        200: {
          $ref: '#/components/responses/OK',
        },
        422: {
          $ref: '#/components/responses/UNPROCESABLE_ENTITY',
        },
        500: {
          $ref: '#/components/responses/INTERNAL_SERVER_ERROR',
        },
      },
    },
  },
  '/auth/refresh-token': {
    post: {
      tags: ['auth'],
      summary: 'Renews a user token',
      operationId: 'refreshToken',
      requestBody: {
        description: 'User token object that will be renewed',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserRefreshToken',
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
        500: {
          $ref: '#/components/responses/INTERNAL_SERVER_ERROR',
        },
      },
    },
  },
  '/auth/forgot-password': {
    post: {
      tags: ['auth'],
      summary: 'Requests a user password reset',
      operationId: 'forgotPassword',
      requestBody: {
        description: 'User credentials object that will be reseted',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ForgotPassword',
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
        500: {
          $ref: '#/components/responses/INTERNAL_SERVER_ERROR',
        },
      },
    },
  },
  '/auth/reset-password': {
    post: {
      tags: ['auth'],
      summary: 'Resets a user password',
      operationId: 'resetPassword',
      parameters: [{ $ref: '#/components/parameters/resetPasswordTokenParam' }],
      requestBody: {
        description: 'User password object that will be changed',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResetPassword',
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
        500: {
          $ref: '#/components/responses/INTERNAL_SERVER_ERROR',
        },
      },
    },
  },
};
