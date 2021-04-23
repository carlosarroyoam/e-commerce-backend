class UserController {
  index(req, res) {
    return res.json({
      status: 200,
      message: 'OK',
      data: {
        message: 'hello world',
      },
    });
  }
}

module.exports = UserController;
