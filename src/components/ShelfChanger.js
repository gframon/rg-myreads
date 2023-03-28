const ShelfChanger = ({currentShelf, onShelfUpdate }) => {
  const handleChange = (event) => {
    event.preventDefault();
    onShelfUpdate(event.target.value);
  };
  return (
    <div className='book-shelf-changer'>
      <select value={currentShelf} onChange={handleChange}>
        <option value='none' disabled>
          Move to...
        </option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
      </select>
    </div>
  );
};

export default ShelfChanger;
