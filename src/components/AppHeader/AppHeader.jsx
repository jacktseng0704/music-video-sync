import React from 'react';
import './AppHeader.scss';
import SearchBar from '../searchBar/SearchBar';
import { Link, Route } from 'react-router-dom';
import { RiFolderMusicFill } from 'react-icons/ri';
import { getUserData } from '../../util/localStorage';

function AppHeader({ query, setQuery, setShowUserRoom, searchYoutube }) {
  // const history = useHistory();

  // const handleClick = () => {
  //   let storage = localStorage.getItem('partyroom');
  //   if (storage) {
  //     let userId = JSON.parse(storage).userId;
  //     // history.push(`/user/${userId}`);
  //   } else {
  //     alert('Please enter your name to open a room');
  //   }
  //   console.log('clicked!');
  // };

  const handleClick = () => {
    setShowUserRoom((prevState) => !prevState);
  };

  return (
    <header className='AppHeader'>
      <Link to='/' className='link'>
        <h1 className='header-title'>Sync Music and Video</h1>
      </Link>
      <Route exact path='/'>
        <SearchBar
          query={query}
          setQuery={setQuery}
          className='search-bar'
          searchYoutube={searchYoutube}
        />
      </Route>

      {getUserData() && (
        <div className='user-room' onClick={handleClick}>
          {/* User's room */}
          <RiFolderMusicFill size={30} />
        </div>
      )}
    </header>
  );
}

export default AppHeader;
