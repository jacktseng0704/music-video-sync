import { useState } from 'react';
import './InputBox.scss';
import sendIcon from '../../images/send.svg';
import firebase, { db } from '../../util/firebase';
import { getUserData } from '../../util/localStorage';

function InputBox({ roomId }) {
  const [inputMessage, setInputMessage] = useState('');
  const { userName } = getUserData();

  const messageRef = db.collection('partyroom').doc(roomId).collection('messages');

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) postMsgToFirebase();
    setInputMessage('');
  };

  const postMsgToFirebase = () => {
    messageRef.add({
      content: inputMessage,
      timeSent: firebase.firestore.FieldValue.serverTimestamp(),
      user: userName,
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
      <button className='input-btn' disabled={!inputMessage}>
        <img src={sendIcon} alt='send-icon' />
      </button>
    </form>
  );
}

export default InputBox;
