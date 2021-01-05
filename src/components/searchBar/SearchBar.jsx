import { useState, useRef } from 'react';
import './SearchBar.scss';
// import { IoSearchCircleSharp } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { suggest } from '../../api/youtube';
import useOutsideClick from '../../util/modal';

function SearchBar({ query, setQuery, searchYoutube }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [inputFocus, setInputFocus] = useState(false);

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
    setInputFocus(false);
    setValue('');
    const results = await searchYoutube(queryString);
    setSuggestions(null);
    console.log(results);
  };

  const handleFocus = () => {
    setInputFocus(true);
  };

  return (
    <>
      <form
        className='search-bar'
        onSubmit={handleSubmit}
        // onFocus={(e) => {
        //   console.log((e.currentTarget.style.width = '50%'));
      >
        <div className='input-container'>
          {/* <IoSearchCircleSharp className='search-icon' size={30} /> */}
          <AiOutlineSearch className='search-icon' size={30} />
          <input
            type='text'
            value={value}
            onChange={handleChange}
            placeholder='Search...'
            onFocus={handleFocus}
          />
          {value && inputFocus && <Suggestions onSearch={onSearch} items={suggestions} />}
        </div>
      </form>
    </>
  );
}

function Suggestions({ onSearch, items }) {
  // const suggestRef = useRef();

  // useOutsideClick(suggestRef, () => {
  //   console.log((suggestRef.current.style.display = 'none'));
  // });

  if (!items || !items.length) {
    return null;
  }
  return (
    // <section className='section' ref={suggestRef}>
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
