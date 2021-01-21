import './OldUserForm.scss';

function NewUserForm({ localRepo, setButton }) {
  const createNewRoom = () => {
    setButton(1);
  };

  return (
    <>
      {' '}
      <h2 className='paragraph'>Welcome {localRepo.userName}</h2>
      <button type='submit' onClick={createNewRoom} name='create'>
        Create a new room
      </button>
    </>
  );
}

export default NewUserForm;
