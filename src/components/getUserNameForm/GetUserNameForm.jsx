import { useState, useRef, useEffect } from 'react';
import './GetUserNameForm.scss';
import { nanoid } from 'nanoid';

function GetUserNameForm({ setUserData }) {
  const [userName, setUserName] = useState('');
  const [userId] = useState(nanoid(10));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLocalStorage(userName);
    setUserData({ userName, userId });
  };

  const updateLocalStorage = (userName) => {
    const data = {
      userName,
      userId,
    };
    localStorage.setItem('partyroom', JSON.stringify(data));
  };

  return (
    <>
      <div className='GuestForm GetUserNameForm'>
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
    </>
  );
}

export default GetUserNameForm;
