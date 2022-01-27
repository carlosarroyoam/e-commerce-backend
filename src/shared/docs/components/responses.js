module.exports = {
  responses: {
    OK: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'OK',
            },
          },
        },
      },
    },
    BAD_REQUEST: {
      description: 'BAD_REQUEST',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'The request data is not valid',
              error: 'Bad request',
            },
          },
        },
      },
    },
    NOT_FOUND: {
      description: 'NOT_FOUND',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'The /api/v1/wrong-route route was not found on this server',
              error: 'Not found',
            },
          },
        },
      },
    },
    UNAUTHORIZED: {
      description: 'UNAUTHORIZED',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'Failed to authorize user with the email: example@domain.com',
              error: 'Unauthorized',
            },
          },
        },
      },
    },
    FORBIDDEN: {
      description: 'FORBIDDEN',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'The user has not permission to perform this action',
              error: 'Forbidden',
            },
          },
        },
      },
    },
    UNPROCESABLE_ENTITY: {
      description: 'UNPROCESABLE_ENTITY',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'The request data is not valid',
              error: 'Unprocessable entity',
              data: {
                password: 'The password must be between 8 and 16 characters',
                email: 'The email format is invalid',
              },
            },
          },
        },
      },
    },
    INTERNAL_SERVER_ERROR: {
      description: 'INTERNAL_SERVER_ERROR',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'Error while updating information',
              error: 'Internal server error',
            },
          },
        },
      },
    },
  },
};
