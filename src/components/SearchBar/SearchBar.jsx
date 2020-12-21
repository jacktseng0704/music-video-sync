import { useState } from 'react';
import './SearchBar.scss';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { suggest } from '../../api/youtube';

function SearchBar({ query, setQuery, searchYoutube }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(null);

  const handleChange = (e) => {
    onTypeSuggest(e.target.value);
    setValue(e.target.value);
  };

  const onTypeSuggest = async (queryString) => {
    if (queryString.length < 5) {
      return null;
    }
    const list = await suggest(queryString);
    return setSuggestions(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value);
    setValue('');
  };

  const onSearch = async (queryString) => {
    const results = await searchYoutube(queryString);
    setValue('');
    setSuggestions(null);

    console.log(results);
  };

  return (
    <>
      <form className='search-bar' onSubmit={handleSubmit}>
        <div className='input-container'>
          {/* <IoSearchCircleSharp className='search-icon' size={30} /> */}
          <input type='search' value={value} onChange={handleChange} placeholder='Search...' />
          <Suggestions onSearch={onSearch} items={suggestions} />
        </div>
      </form>
    </>
  );
}

function Suggestions({ onSearch, items }) {
  if (!items || !items.length) {
    return null;
  }
  return (
    <section className='section'>
      {' '}
      {items.map((item, key) => {
        return <SuggestionRow onSearch={onSearch} key={key} text={item} />;
      })}
    </section>
  );
}

function SuggestionRow({ onSearch, text }) {
  return (
    <span className='suggestion-span' onClick={() => onSearch(text)}>
      {text}
    </span>
  );
}

export default SearchBar;
