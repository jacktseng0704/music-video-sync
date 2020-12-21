import React, { useState } from 'react';
import './GetUserNameForm.scss';
import { nanoid } from 'nanoid';

function GetUserNameForm({ setUserData }) {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(nanoid());

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked on form!', userName);
    updateLocalStorage(userName);
    setUserData({ userName, userId });
  };

  const updateLocalStorage = (userName) => {
    const data = {
      userId,
      userName,
    };
    localStorage.setItem('partyroom', JSON.stringify(data));
  };

  return (
    <>
      <div className='GuestForm'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Please enter your name to join the room</h2>
          <input
            value={userName}
            onChange={handleChange}
            className='input-field'
            placeholder='Type your name'
          />
        </form>
      </div>
    </>
  );
}

export default GetUserNameForm;
