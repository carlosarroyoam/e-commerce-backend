module.exports = {
  responses: {
    OK: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'Ok',
              data: null,
            },
          },
        },
      },
    },
    CREATED: {
      description: 'CREATED',
      content: {
        'application/json': {
          schema: {
            example: {
              message: 'Ok',
              data: null,
            },
          },
        },
      },
    },
    NO_CONTENT: {
      description: 'NO_CONTENT',
    },
    BAD_REQUEST: {
      description: 'BAD_REQUEST',
      content: {
        'application/json': {
          schema: {
            example: {
              error: 'Bad request',
              message: 'The request is not valid',
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
              error: 'Not found',
              message: 'The /api/v1/wrong-route route was not found on this server',
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
              error: 'Unauthorized',
              message: 'Failed to authorize user with the email: example@domain.com',
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
              error: 'Forbidden',
              message: 'The user has not permission to perform this action',
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
              error: 'Unprocessable entity',
              message: 'The request data is not valid',
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
              error: 'Internal server error',
              message: 'Error while updating information',
            },
          },
        },
      },
    },
  },
};
