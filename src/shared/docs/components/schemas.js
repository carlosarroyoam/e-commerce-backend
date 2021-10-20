module.exports = {
  schemas: {
    UserCredentials: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        device_fingerprint: {
          type: 'string',
        },
      },
      required: ['email', 'password', 'device_fingerprint'],
    },
    UserRevokeRefreshToken: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
        },
        user_id: {
          type: 'integer',
        },
      },
      required: ['refresh_token', 'user_id'],
    },
    UserRefreshToken: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
        },
        device_fingerprint: {
          type: 'string',
        },
      },
      required: ['refresh_token', 'device_fingerprint'],
    },
    ForgotPassword: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
      },
      required: ['email'],
    },
    ResetPassword: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
        },
        confirm_password: {
          type: 'string',
        },
      },
      required: ['password', 'confirm_password'],
    },
    ChangeUserPassword: {
      type: 'object',
      properties: {
        current_password: {
          type: 'string',
        },
        new_password: {
          type: 'string',
        },
        confirm_password: {
          type: 'string',
        },
      },
      required: ['current_password', 'new_password', 'confirm_password'],
    },
    AddAdmin: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        password_confirm: {
          type: 'string',
        },
        is_super: {
          type: 'boolean',
          default: false,
        },
      },
      required: ['first_name', 'last_name', 'email', 'password', 'password_confirm'],
    },
    UpdateAdmin: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
        is_super: {
          type: 'boolean',
          default: false,
        },
      },
      required: ['first_name', 'last_name', 'password'],
    },
    AddCustomer: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        password_confirm: {
          type: 'string',
        },
      },
      required: ['first_name', 'last_name', 'email', 'password', 'password_confirm'],
    },
    UpdateCustomer: {
      type: 'object',
      properties: {
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
      },
      required: ['first_name', 'last_name', 'password'],
    },
  },
};
