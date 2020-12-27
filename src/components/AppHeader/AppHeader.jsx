import React, { useState } from 'react';
import './AppHeader.scss';
import SearchBar from '../searchBar/SearchBar';
import { Link, Route } from 'react-router-dom';
import { RiFolderMusicFill } from 'react-icons/ri';
import { HiShare } from 'react-icons/hi';

import { IoMdAdd } from 'react-icons/io';
import { getUserData } from '../../util/localStorage';

import ModalForm from '../modalForm/ModalForm';

function AppHeader({ query, setQuery, setShowUserRoom, searchYoutube }) {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  const createRoom = () => {
    setShowModal(true);
  };

  const copyURL = () => {
    const URL = window.location.href;
    textToClipboard(URL);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const textToClipboard = (text) => {
    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <>
      {showModal && <ModalForm setShowModal={setShowModal} />}
      <header className='AppHeader'>
        <Link to='/' className='link'>
          <h1 className='header-title'>Music Video Sync</h1>
        </Link>
        {getUserData() && <span className='user-name'>{`Hi~ ${getUserData().userName}`}</span>}
        {/* <Route exact path='/partyroom'>
          <SearchBar
            query={query}
            setQuery={setQuery}
            className='search-bar'
            searchYoutube={searchYoutube}
          />
        </Route> */}

        <div className='share-link'>
          <HiShare className='share-icon' size={30} onClick={copyURL} />
        </div>

        <div className='add-icon'>
          {/* <GrAdd className='add-icon' size={30} onClick={createRoom} /> */}
          <IoMdAdd size={45} onClick={createRoom} />
        </div>
        {getUserData() && (
          <div className='user-room' onClick={handleClick}>
            {/* User's room */}
            <RiFolderMusicFill size={40} />
          </div>
        )}
      </header>
      {showNotification && <div className='notification'>Link Copied!</div>}
    </>
  );
}

export default AppHeader;
