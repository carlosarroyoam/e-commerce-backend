class UserMapper {
  static toDTO(user) {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
    };
  }
}

module.exports = UserMapper;
