class BookController {
  constructor({ bookService }) {
    this._bookService = bookService;
  }

  async index(request, response, next) {
    try {
      const books = await this._bookService.findAll();

      if (books.length < 1) {
        response.status(404).send({
          message: 'No books registered',
        });

        return;
      }

      response.send({
        message: 'Ok',
        data: books,
      });

      return;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
