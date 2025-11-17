const getUserSchema = {
  schema: {
      querysting: {
        type: 'object',
        properties: {
          id: {type: 'number', minimum: 1}
      },
      required: ['id'],
    }
  }
}

const updateUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: {type: 'number', minimum: 1},
        username: {type: 'string', nullable: false },
        access_level: {type: 'string', enum: ['admin', 'operator', 'viewer'] },
        last_login: {type: 'string', format: 'date-time'}
      },
      required: ['id'],
      minProperties: 2
    }
  }
}

const postUserSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        access_level: { type: 'string',
                        enum: ['admin', 'operator', 'viewer']
                      }
      },
      required: ['username', 'access_level'],
    }
  }
};

module.exports = { postUserSchema, getUserSchema, updateUserSchema};
