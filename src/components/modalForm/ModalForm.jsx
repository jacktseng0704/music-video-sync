import React, { useState, useRef, useEffect } from 'react';
import './ModalForm.scss';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import useOutsideClick from '../../util/modal';

function ModalForm({ setShowModal, video }) {
  const ref = useRef();
  const inputRef = useRef();
  const [name, setName] = useState('');
  const [userId] = useState(nanoid(10));
  const [localRepo, setLocalRepo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
    const repository = localStorage.getItem('partyroom');

    if (repository) {
      setLocalRepo(JSON.parse(repository));
    }
  }, []);
  console.log('========localRepo', localRepo);

  useOutsideClick(ref, () => {
    setShowModal(false);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localStorageData = await createLocalStorage();
    await createRoom(localStorageData);

    console.log('name:', name);
    console.log('user id:', userId);
    console.log('video', video);
    console.log('\n');
    setName('');
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const createLocalStorage = () => {
    let storage = { roomId: [] };

    storage['userName'] = name;
    storage['userId'] = userId;
    storage['roomId'].push(userId);

    console.log('---->userId', storage['userId']);
    console.log('---->roomId', storage['roomId']);
    console.log('---->userName', storage['userName']);

    window.localStorage.setItem('partyroom', JSON.stringify(storage));
    return storage;
  };

  const createRoom = async (localStorageData) => {
    const { snippet, id } = video;
    console.log('snippet', snippet);
    console.log('create room for video id: ', id.videoId);

    console.log(localStorageData);

    // const docRef = await db.collection('partyroom').add({
    //   userName: name,
    //   userId: userId,
    //   title: snippet.title,
    //   videoId: id.videoId,
    // });

    // history.push(`/partyroom/${localStorageData.userId}`);
    // console.log('Room id: ', docRef.id);
  };

  return (
    <div className='ModalForm'>
      <form className='modal-form' onSubmit={handleSubmit} ref={ref}>
        {localRepo && (
          <>
            {' '}
            <h2 className='paragraph'>Welcome {localRepo.userName}</h2>
            <button>Create a new room</button>
            <button>Use previous room</button>
          </>
        )}

        {!localRepo && (
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
