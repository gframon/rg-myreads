import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

const SearchBooks = ({ books, onShelfUpdate }) => {
  const [bookList, setBookList] = useState([]);
  const [filterText, setFilterText] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setFilterText(value);

    const search = async () => {
      const res = await BooksAPI.search(value, 60);

      if (res && res.hasOwnProperty('error')) {
        setBookList([]);
      } else {
        res.forEach((item) => {
          const bookFound = books.find((book) => book.title === item.title);
          item.shelf = bookFound ? bookFound.shelf : 'none';
        });
        setBookList(res);
      }
    };

    if (value.length !== 0) {
      setBookList([]);
      search();
    } else {
      setBookList([]);
    }
  };

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link className='close-search' to='/'>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            value={filterText}
            placeholder='Search by title, author, or ISBN'
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {bookList.length > 0 &&
            bookList.map((book, index) => {
              return (
                <li key={index}>
                  <Book book={book} onShelfChange={onShelfUpdate} prevPage='/search' />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
