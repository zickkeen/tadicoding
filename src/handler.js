const { nanoid } = require('nanoid');
const { addBooks, books, reWriteBooks } = require('./books');

/**
 * {
 * "name": string,
 * "year": number,
 * "author": string,
 * "summary": string,
 * "publisher": string,
 * "pageCount": number,
 * "readPage": number,
 * "reading": boolean
 * }
 */

const addBookHandler = (request, h) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount,
      readPage, reading,
    } = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = [{
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    }];
    if (name === undefined || name === null || name === '') {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    } if (id !== undefined) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      books.push(newBook);
      addBooks(newBook[0]);
      return response;
    } if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    return h.response({
      status: 'error',
      message: 'Gagal',
      data: {
        books: newBook,
      },
    });
  } catch (error) {
    const response = h.response({
      status: 'error',
      message: 'Error with this data',
      data: {
        books: error,
      },
    });
    response.code(500);
    return response;
  }
};

const getAllBooksHandler = () => {
  const result = books.map((book) => (
    { id: book.id, name: book.name, publisher: book.publisher }
  ));
  return {
    status: 'success',
    data: result,
  };
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      title,
      tags,
      body,
      updatedAt,
    };
    reWriteBooks(books);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    reWriteBooks(books);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
