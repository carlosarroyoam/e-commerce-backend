class UserRepository {
  constructor({ userDao }) {
    this._userDao = userDao;
  }

  async findAll() {
    const users = await this._userDao.getAll();

    return users;
  }

  async find(id) {
    const user = await this._userDao.getById(id);

    return user;
  }

  async store(user) {
    const createdUser = await this._userDao.create(user);

    return createdUser;
  }

  async update(userId, user) {
    const updatedUser = await this._userDao.update(userId, user);

    return updatedUser;
  }
}

module.exports = UserRepository;
