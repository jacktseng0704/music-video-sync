import React from 'react';
import './AppHeader.scss';
import SearchBar from '../SearchBar/SearchBar';

function AppHeader() {
  return (
    <header className='AppHeader'>
      <h1 className='header-title'>Sync Music and Video</h1>
      <SearchBar />
    </header>
  );
}

export default AppHeader;
