import { Link } from 'react-router-dom';
import BooksList from './BooksList';

const Shelves = ({ books, onShelfUpdate }) => {
  const shelves = ['currentlyReading', 'wantToRead', 'read'];

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, newShelf) => {
    let bookID = event.dataTransfer.getData('id');
    let currentBookShelf = event.dataTransfer.getData('currentShelf');
    if (currentBookShelf !== newShelf) {
      onShelfUpdate({ id: bookID }, newShelf);
    }
  };

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          {shelves.map((shelf) => {
            return (
              <div
                key={shelf}
                className='bookshelf'
                onDragOver={(event) => handleDragOver(event)}
                onDrop={(event) => handleDrop(event, shelf)}
              >
                <h2 className='bookshelf-title'>
                  {shelf === 'currentlyReading'
                    ? 'Currently Reading'
                    : shelf === 'wantToRead'
                    ? 'Want to Read'
                    : 'Read'}
                </h2>
                <BooksList shelf={shelf} books={books} updateBookShelf={onShelfUpdate} />
              </div>
            );
          })}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Book Search</Link>
      </div>
    </div>
  );
};

export default Shelves;
