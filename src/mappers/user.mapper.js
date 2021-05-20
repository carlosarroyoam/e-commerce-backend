/* eslint-disable class-methods-use-this */
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

  toDatabaseEntity(userDto) {
    return {
      first_name: userDto.firstName,
      last_name: userDto.lastName,
      email: userDto.email,
    };
  }
}

module.exports = UserMapper;
