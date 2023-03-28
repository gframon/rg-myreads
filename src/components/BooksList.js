import { useState, useEffect } from 'react';
import Book from './Book';

const BooksList = ({ shelf, books, updateBookShelf }) => {
  const [booksToDisplay, setBooksToDisplay] = useState([]);

  useEffect(() => {
    if (books) {
      setBooksToDisplay(books.filter((book) => book.shelf === shelf));
    }
  }, [shelf, books]);

  return (
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {booksToDisplay.map((book, index) => (
          <li key={index}>
            <Book book={book} onShelfChange={updateBookShelf} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BooksList;
