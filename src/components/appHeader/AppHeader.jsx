import { useState } from 'react';
import './AppHeader.scss';
import { Link } from 'react-router-dom';

import { RiFolderMusicFill } from 'react-icons/ri';
import { HiShare } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';

import { getUserData } from '../../util/localStorage';

import ModalForm from '../modalForm/ModalForm';

function AppHeader({ setShowUserRoom }) {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const userData = getUserData();

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
    const dummy = document.createElement('textarea');
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
        <Link to='/rooms' className='link'>
          <h1 className='header-title'>Music Video Sync</h1>
        </Link>

        <div className='header-menu'>
          {userData && <span className='user-name'>{`Hi~ ${userData.userName}`}</span>}

          <div className='share-link'>
            <HiShare className='share-icon' size={30} onClick={copyURL} />
          </div>

          <div className='add-icon'>
            <IoMdAdd size={45} onClick={createRoom} />
          </div>
          {userData && (
            <div className='user-room' onClick={handleClick}>
              <RiFolderMusicFill size={40} />
            </div>
          )}
        </div>
      </header>
      {showNotification && <div className='notification'>Link Copied!</div>}
    </>
  );
}

export default AppHeader;
