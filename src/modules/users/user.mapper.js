const objectUtils = require('../../shared/utils/object.utils');

/**
 * UserMapper class.
 */
class UserMapper {
  /**
   * Maps a user object to a UserDto object.
   *
   * @param {object} user The user object to map.
   * @return {object} The admin dto object.
   */
  toDto(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_role_id: user.user_role_id,
      user_role: user.user_role,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };
  }

  /**
   * Maps a userDto to a Admin database entity object.
   *
   * @param {object} userDto The user dto object to map.
   * @return {object} The admin database entity object.
   */
  toDatabaseEntity(userDto) {
    const userDbEntity = {
      id: userDto.id,
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      password: userDto.password,
      user_role_id: userDto.user_role_id,
    };

    const cleanedUserDbEntity = objectUtils.removeUndefined(userDbEntity);

    return cleanedUserDbEntity;
  }
}

module.exports = new UserMapper();
