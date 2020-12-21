import React from 'react';
import './AppHeader.scss';
import SearchBar from '../searchBar/SearchBar';
import { Link, Route, useHistory } from 'react-router-dom';
import { RiFolderMusicFill } from 'react-icons/ri';

function AppHeader({ query, setQuery }) {
  const history = useHistory();

  const handleClick = () => {
    let storage = localStorage.getItem('partyroom');
    if (storage) {
      let userId = JSON.parse(storage).userId;
      history.push(`/user/${userId}`);
    } else {
      alert('Please enter your name to open a room');
    }
    console.log('clicked!');
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
        {/* User's room */}
        <RiFolderMusicFill size={30} />
      </div>
    </header>
  );
}

export default AppHeader;
