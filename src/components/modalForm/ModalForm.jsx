import React, { useState, useRef } from 'react';
import './ModalForm.scss';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import useOutsideClick from '../../util/modal';

function ModalForm({ setShowModal, video }) {
  const ref = useRef();
  const [name, setName] = useState('');
  const [userId] = useState(nanoid);
  const history = useHistory();

  useOutsideClick(ref, () => {
    setShowModal(false);
  });

  const handleSubmit = async (e) => {
    await createRoom(e);

    e.preventDefault();
    console.log('name:', name);
    console.log('user id:', userId);
    console.log('video', video);
    console.log('\n');
    setShowModal(false);
    setName('');
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const createRoom = async () => {
    const { snippet, id } = video;
    console.log('snippet', snippet);
    console.log('create room for video id: ', id.videoId);
    // const docRef = await db.collection('partyroom').add({
    //   title: snippet.title,
    //   videoId: e.currentTarget.id,
    // });
    // history.push(`/partyroom/${docRef.id}`);
    // console.log('Room id: ', docRef.id);
  };

  return (
    <div className='ModalForm'>
      <form className='modal-form' onSubmit={handleSubmit} ref={ref}>
        <h2>Create a room</h2>
        <input
          className='modal-input'
          type='input'
          placeholder='Enter your name to create a room'
          onChange={handleChange}
          value={name}
        />
        <input className='modal-submit-btn' type='submit' disabled={!name} />
      </form>
    </div>
  );
}

export default ModalForm;
