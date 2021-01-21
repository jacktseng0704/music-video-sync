import { useState, useRef, useEffect } from 'react';
import './ModalForm.scss';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import { db } from '../../util/firebase';
import useOutsideClick from '../../util/modal';
import OldUserForm from '../oldUserForm/OldUserForm';

function ModalForm({ setShowModal, video, setUserData }) {
  const ref = useRef();
  const inputRef = useRef();
  const [name, setName] = useState('');
  const [userId] = useState(nanoid(10));
  const [roomId] = useState(nanoid(15));
  const [button, setButton] = useState(1);
  const [localRepo, setLocalRepo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const repository = localStorage.getItem('partyroom');

    if (repository) {
      setLocalRepo(JSON.parse(repository));
      return;
    }
    inputRef.current.focus();
  }, []);
  // console.log('========localRepo', localRepo);

  useOutsideClick(ref, () => {
    setShowModal(false);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localStorageData = await checkLocalStorage();
    if (button === 2) {
      history.push(`/user/${localStorageData.userId}`);
      // console.log('use old room!');
    } else {
      // console.log('new room created!');
      await createRoom(localStorageData);
    }
    console.log('user id:', localStorageData.userId);
    console.log('\n');
    setName('');
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const checkLocalStorage = () => {
    let storage = null;

    const readRepo = () => {
      storage = localRepo;
    };

    const createRepo = () => {
      storage = {};

      storage['userName'] = name;
      storage['userId'] = userId;
      window.localStorage.setItem('partyroom', JSON.stringify(storage));
    };
    localRepo ? readRepo() : createRepo();

    // console.log('---->userId', storage['userId']);
    // console.log('---->userName', storage['userName']);

    return storage;
  };

  const createRoom = async ({ userId, userName }) => {
    await db.collection('partyroom').doc(roomId).set({
      userName,
      userId,
      roomId: roomId,
    });

    history.push(`/partyroom/${roomId}`);
  };

  return (
    <div className='ModalForm'>
      <form className='modal-form' onSubmit={handleSubmit} ref={ref}>
        {localRepo ? (
          <OldUserForm localRepo={localRepo} setButton={setButton} />
        ) : (
          <>
            <h2>Create a room</h2>

            <input
              ref={inputRef}
              className='modal-input'
              type='input'
              placeholder='Enter your name to create a room'
              onChange={handleChange}
              value={name}
            />
            <input className='modal-submit-btn' type='submit' disabled={!name} />
          </>
        )}
      </form>
    </div>
  );
}

export default ModalForm;
