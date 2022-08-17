const fs = require('fs');
// import fs from 'fs';

const readBooks = () => {
  const rawdata = fs.readFileSync('./src/books.json');
  const books = JSON.parse(rawdata);
  return books;
};

const addBooks = (newBook) => {
  const books = readBooks();
  books.push(newBook);
  fs.writeFileSync('./src/books.json', JSON.stringify(books));
  return newBook;
};

const reWriteBooks = (newBooks) => {
  fs.writeFileSync('./src/books.json', JSON.stringify(newBooks));
  return newBooks;
};
const books = readBooks();

module.exports = { addBooks, books, reWriteBooks };
