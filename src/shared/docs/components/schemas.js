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
        user_id: {
          type: 'integer',
        },
      },
      required: ['user_id'],
    },
    UserRefreshToken: {
      type: 'object',
      properties: {
        device_fingerprint: {
          type: 'string',
        },
      },
      required: ['device_fingerprint'],
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
    AddCustomerAddress: {
      type: 'object',
      properties: {
        street_name: {
          type: 'string',
        },
        street_number: {
          type: 'string',
        },
        sublocality: {
          type: 'string',
        },
        locality: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        postal_code: {
          type: 'string',
        },
      },
      required: ['street_name', 'street_number', 'sublocality', 'locality', 'state', 'postal_code'],
    },
    UpdateCustomerAddress: {
      type: 'object',
      properties: {
        street_name: {
          type: 'string',
        },
        street_number: {
          type: 'string',
        },
        sublocality: {
          type: 'string',
        },
        locality: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        postal_code: {
          type: 'string',
        },
      },
      required: ['street_name', 'street_number', 'sublocality', 'locality', 'state', 'postal_code'],
    },
    AddCategory: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      required: ['title'],
    },
    UpdateCategory: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      required: ['title'],
    },
    AddAttribute: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      required: ['title'],
    },
  },
  UpdateAttribute: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
    },
    required: ['title'],
  },
};
