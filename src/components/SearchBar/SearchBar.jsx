import { useState } from 'react';
import './SearchBar.scss';

function SearchBar({ query, setQuery }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value);
    setValue('');
  };

  return (
    <>
      <form className='search-bar' onSubmit={handleSubmit}>
        <input type='search' value={value} onChange={handleChange} placeholder='Search...' />
      </form>
    </>
  );
}

export default SearchBar;
