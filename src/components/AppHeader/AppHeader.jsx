import React from 'react';
import './AppHeader.scss';
import SearchBar from '../searchBar/SearchBar';
import { Link } from 'react-router-dom';

function AppHeader({ query, setQuery }) {
  return (
    <header className='AppHeader'>
      <Link to='/' className='link'>
        <h1 className='header-title'>Sync Music and Video</h1>
      </Link>
      <SearchBar query={query} setQuery={setQuery} />
    </header>
  );
}

export default AppHeader;
