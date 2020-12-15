import React from 'react';
import './AppHeader.scss';
import SearchBar from '../searchBar/SearchBar';
import { Link, Route, useHistory } from 'react-router-dom';

function AppHeader({ query, setQuery }) {
  const history = useHistory();

  const handleClick = () => {
    console.log('clicked!');
    history.push(`/user`);
  };

  return (
    <header className='AppHeader'>
      <Link to='/' className='link'>
        <h1 className='header-title'>Sync Music and Video</h1>
      </Link>
      <Route exact path='/'>
        <SearchBar query={query} setQuery={setQuery} className='search-bar' />
      </Route>
      <div className='user-room' onClick={handleClick}>
        User's room
      </div>
    </header>
  );
}

export default AppHeader;
