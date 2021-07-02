/* eslint-disable class-methods-use-this */

/**
 * Contains methods for mapping User entities.
 */
class UserMapper {
    /**
     * Maps a user object to a UserDto object.
     *
     * @param {object} user
     * @return {object} The admin dto object
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
     * Maps a userDto to a Admin database entity object.
     *
     * @param {object} userDto
     * @return {object} The admin database entity object
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
            (key) => userDbEntity[key] === undefined && delete userDbEntity[key]
        );

        return userDbEntity;
    }
}

module.exports = UserMapper;
