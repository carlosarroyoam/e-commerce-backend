module.exports = {
  parameters: {
    SkipParam: {
      name: 'skip',
      in: 'query',
      description: 'Pagination skip items',
      schema: {
        type: 'integer',
        default: 0,
      },
    },
    SearchParam: {
      name: 'search',
      in: 'query',
      description: 'Search criteria',
      schema: {
        type: 'string',
      },
    },
    UserSortParam: {
      name: 'sort',
      in: 'query',
      description: 'Sort by',
      schema: {
        type: 'string',
        enum: [
          'id',
          '-id',
          'first_name',
          '-first_name',
          'last_name',
          '-last_name',
          'email',
          '-email',
        ],
      },
    },
    UserStatusParam: {
      name: 'status',
      in: 'query',
      description: 'User status',
      schema: {
        type: 'string',
        enum: ['active', 'inactive'],
      },
    },
    resetPasswordTokenParam: {
      name: 'token',
      in: 'query',
      required: true,
      schema: {
        type: 'string',
      },
    },
  },
};