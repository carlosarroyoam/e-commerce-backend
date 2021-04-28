class BookController {
  constructor({ bookService }) {
    this._bookService = bookService;
  }

  async index(request, response, next) {
    const books = await this._bookService.findAll();

    response.send({
      status: 200,
      message: 'OK',
      data: books,
    });
  }
}

module.exports = BookController;
