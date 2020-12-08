import React, { useState } from 'react';
import './SearchBar.scss';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    setQuery('');
  };

  return (
    <>
      <form className='search-bar' onSubmit={handleSubmit}>
        <input type='search' value={query} onChange={handleChange} placeholder='Search...' />
      </form>
    </>
  );
}

export default SearchBar;
