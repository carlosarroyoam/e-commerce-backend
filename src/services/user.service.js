class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async findAll() {
    const users = await this._userRepository.findAll();

    return users;
  }

  async find(id) {
    const user = await this._userRepository.find(id);

    return user;
  }

  async store(user) {
    const createdUser = await this._userRepository.store(user);

    return createdUser;
  }
}

module.exports = UserService;
