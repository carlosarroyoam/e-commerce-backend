class UserController {
  constructor({ userService }) {
    this._userService = userService;
  }

  index() {
    return this._userService.findAll();
  }
}

module.exports = UserController;
