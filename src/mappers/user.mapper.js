class UserMapper {
  toDto(user) {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleString(),
      updatedAt: new Date(user.updated_at).toLocaleString(),
      deletedAt: user.deleted_at ? new Date(user.deleted_at).toLocaleString() : undefined,
    };
  }
}

module.exports = UserMapper;
