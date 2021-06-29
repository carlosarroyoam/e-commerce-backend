/* eslint-disable class-methods-use-this */
class UserMapper {
  /**
   * @param {object} user
   */
  toDto(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      userable_type: user.userable_type,
      userable_id: user.userable_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };
  }

  /**
   * @param {object} userDto
   */
  toDatabaseEntity(userDto) {
    const userDbEntity = {
      id: userDto.id,
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      password: userDto.password,
      userable_type: userDto.userable_type,
      userable_id: userDto.userable_id,
    };

    Object.keys(userDbEntity).forEach(
      (key) => userDbEntity[key] === undefined && delete userDbEntity[key],
    );

    return userDbEntity;
  }
}

module.exports = UserMapper;
