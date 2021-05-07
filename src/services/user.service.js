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
}

module.exports = UserService;
