import React from 'react';
import './AppHeader.scss';
import SearchBar from '../searchBar/SearchBar';

function AppHeader({ query, setQuery }) {
  return (
    <header className='AppHeader'>
      <h1 className='header-title'>Sync Music and Video</h1>
      <SearchBar query={query} setQuery={setQuery} />
    </header>
  );
}

export default AppHeader;
