import React from 'react';
import './OldUserForm.scss';

function NewUserForm({ localRepo, setButton }) {
  const createNewRoom = () => {
    setButton(1);
  };

  // const useOldRoom = () => {
  //   setButton(2);
  // };

  return (
    <>
      {' '}
      <h2 className='paragraph'>Welcome {localRepo.userName}</h2>
      <button type='submit' onClick={createNewRoom} name='create'>
        Create a new room
      </button>
      {/* <button type='submit' onClick={useOldRoom} name='useprevious'>
        Use previous room
      </button> */}
    </>
  );
}

export default NewUserForm;
