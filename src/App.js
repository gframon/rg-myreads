import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelves from './components/Shelves';
import SearchBooks from './components/SearchBooks';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';

function App() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res);
  };

  const handleShelfUpdate = (book, newShelf) => {
    const updateBook = async () => {
      const res = await BooksAPI.update(book, newShelf);
      console.info(' API update response: ', res);
    };

    updateBook().then(() => getBooks());
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route
          exact
          path='/'
          element={<Shelves books={books} onShelfUpdate={handleShelfUpdate} />}
        />
        <Route
          path='/search'
          element={<SearchBooks books={books} onShelfUpdate={handleShelfUpdate} />}
        />
        <Route path='/book-details' element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
