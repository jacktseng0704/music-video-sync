import { useState } from 'react';
import './SearchBar.scss';
import { IoSearchCircleSharp } from 'react-icons/io5';

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
        <div className='input-container'>
          <IoSearchCircleSharp className='search-icon' size={30} />
          <input type='search' value={value} onChange={handleChange} placeholder='Search...' />
        </div>
      </form>
    </>
  );
}

export default SearchBar;
