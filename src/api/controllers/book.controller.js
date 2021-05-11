/**
 * Book controller
 */
class BookController {
  constructor({ bookService }) {
    this._bookService = bookService;
  }

  /**
   * Handles incoming request from the /books endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async index(request, response, next) {
    try {
      const books = await this._bookService.findAll();

      response.send({
        message: 'Ok',
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
