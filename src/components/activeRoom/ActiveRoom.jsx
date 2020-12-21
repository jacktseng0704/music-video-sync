import React, { useState, useRef, useEffect } from 'react';
import './ActiveRoom.scss';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
// import firebase, { roomRef } from '../../firebase';

function ActiveRoom({ room }) {
  const history = useHistory();
  const [userId] = useState(nanoid(10));
  const [userName, setUserName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [localRepo, setLocalRepo] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    if (showForm) inputRef.current.focus();

    const repository = localStorage.getItem('partyroom');

    if (repository) {
      setLocalRepo(JSON.parse(repository));
      return;
    }
  }, [showForm]);

  const handleClick = () => {
    if (localRepo) {
      history.push(`/partyroom/${room.roomId}`);
    }
    setShowForm(true);
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked on form!', userName);
    updateLocalStorage(userName);
    history.push(`/partyroom/${room.roomId}`);
  };

  const updateLocalStorage = (userName) => {
    const data = {
      userId,
      userName,
    };
    localStorage.setItem('partyroom', JSON.stringify(data));
  };

  // console.log('----->room:', room);
  return (
    <>
      <div className='active-room' onClick={handleClick}>
        {/* <div className='active-rooms'> */}
        {/* <div className='room'> */}
        <div className='room-img'>
          <img src={room.image} alt={room.title} />
        </div>
        <div className='room-video'>{room.title}</div>
        {/* <div className='user-number'>active users: {room.activeUser.length}</div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      {showForm && (
        <div className='GuestForm'>
          <div
            className='guestform-cover'
            onClick={() => {
              setShowForm(false);
            }}></div>
          <form className='form' onSubmit={handleSubmit}>
            <h2>Please enter your name to join the room</h2>
            <input
              value={userName}
              onChange={handleChange}
              ref={inputRef}
              className='input-field'
              placeholder='Type your name'
            />
          </form>
        </div>
      )}
    </>
  );
}

export default ActiveRoom;
