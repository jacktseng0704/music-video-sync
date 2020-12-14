import React, { useState } from 'react';
import './InputBox.scss';
import firebase from '../../firebase';

function InputBox({ roomId }) {
  const [inputMessage, setInputMessage] = useState('');

  const db = firebase.firestore();
  const messageRef = db.collection('partyroom').doc(roomId).collection('messages');

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMsgToFirebase();
    setInputMessage('');
  };

  const postMsgToFirebase = () => {
    messageRef.add({
      content: inputMessage,
      timeSent: firebase.firestore.FieldValue.serverTimestamp(),
      user: 'Jack',
    });
  };

  return (
    <form className='InputBox' onSubmit={handleSubmit}>
      <input
        className='input-field'
        type='input'
        placeholder='Say something good...'
        onChange={handleChange}
        value={inputMessage}
      />
      <input className='submit-btn' type='submit' />
    </form>
  );
}

export default InputBox;
