import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BookDetails = () => {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const { book, from } = location.state;

  return (
    <div className='book-details'>
      <div className='search-books-bar'>
        <Link className='close-search' to={from}>
          Close
        </Link>
      </div>
      <div className='search-books-results'>
        <div className='header'>
          <h1>{'title' in book ? book.title : ''}</h1>
        </div>
        <div className='row'>
          <div
            className='column side'
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${
                'imageLinks' in book ? book.imageLinks.thumbnail : ''
              })`,
            }}
          />
          <div className='column middle'>
            <span className='detail font'>Authors: </span>
            {'authors' in book ? book.authors.join(', ') : ''}
            <br />
            {'categories' in book && (
              <>
                <span className='detail font'>Category: </span>
                {book.categories.join(', ')}
                <br />
              </>
            )}
            {'pageCount' in book && (
              <>
                <span className='detail font'>Pages: </span>
                {book.pageCount}
                <br />
              </>
            )}
            {'publishedDate' in book && (
              <>
                <span className='detail font'>Date Published: </span>
                {book.publishedDate}
                <br />
              </>
            )}
            <span className='detail font'>Book Description: </span>
            {showMore ? book.description : book.description.substring(0, 250) + '... '}
            <button className='detail btn' onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show less' : 'Show more'}
            </button>
            <br />
            <a href={book.previewLink}>Preview</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
