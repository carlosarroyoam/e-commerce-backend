/* eslint-disable class-methods-use-this */
class UserMapper {
  toDto(user) {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
    };
  }

  toDatabaseEntity(userDto) {
    return {
      first_name: userDto.firstName,
      last_name: userDto.lastName,
      email: userDto.email,
      password: userDto.password,
    };
  }
}

module.exports = UserMapper;
