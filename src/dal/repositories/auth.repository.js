const { AuthDao } = require('../dao');
const { UserMapper } = require('../../mappers');

class AuthRepository {
  constructor(connection) {
    this._authDao = new AuthDao(connection);
    this._userMapper = new UserMapper();
  }

  async findByEmail(email) {
    const [result] = await this._authDao.getByEmail(email);

    return result[0];
  }
}

module.exports = AuthRepository;
