import { Link } from 'react-router-dom';

const Book = ({ book, onShelfChange, prevPage = '/' }) => {
  const handleShelfChange = (event) => {
    event.preventDefault();
    onShelfChange(book, event.target.value);
  };

  const handleDragStart = (event) => {
    // Clear the drag data cache (for all formats/types)
    event.dataTransfer.clearData();
    // saving the information in the event
    event.dataTransfer.setData('id', book.id);
    event.dataTransfer.setData('currentShelf', book.shelf);
  };

  return (
    <div className='book' draggable onDragStart={(event) => handleDragStart(event)}>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url(${
              'imageLinks' in book ? book.imageLinks.thumbnail : ''
            })`,
          }}
        />
        <div className='book-shelf-changer'>
          <select
            value={'shelf' in book ? book.shelf : 'none'}
            onChange={handleShelfChange}
          >
            <option value='default' disabled>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{'title' in book ? book.title : ''}</div>
      <div className='book-authors'>
        {'authors' in book ? book.authors.join(', ') : ''}
      </div>
      {prevPage === '/' && (
        <div>
          <Link to={'/book-details'} state={{ book, from: prevPage }}>
            Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default Book;
