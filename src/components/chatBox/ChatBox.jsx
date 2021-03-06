import { useState, useEffect, useRef } from 'react';
import './ChatBox.scss';
import { db } from '../../util/firebase';
import ChatMessage from '../chatMessage/ChatMessage';
import InputBox from '../inputBox/InputBox';

function ChatBox({ roomId, activeUser, showMessage }) {
  const [messages, setMessages] = useState(null);
  const messageEl = useRef(null);

  const roomRef = db.collection('partyroom').doc(roomId);
  const messagesRef = roomRef.collection('messages');

  useEffect(() => {
    if (messageEl) {
      messageEl?.current?.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    renderMessages();
    return () => {
      setMessages(null);
    };
  }, []);

  const renderMessages = () => {
    const unsubscribe = messagesRef.orderBy('timeSent').onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setMessages(data);
    });
    return () => unsubscribe();
  };

  return (
    <div className='ChatBox'>
      <div className='active-users'>
        <h3 className='title'>Users in the room</h3>
        <div className='users-container'>
          {activeUser &&
            activeUser.length &&
            activeUser.map((user) => <span className='user-name'>{user.userName}</span>)}
        </div>
      </div>
      {showMessage && (
        <>
          <div className='messages' ref={messageEl}>
            {messages &&
              messages.map((message, index) => <ChatMessage message={message} key={index} />)}
          </div>
          <InputBox roomId={roomId} />
        </>
      )}
    </div>
  );
}

export default ChatBox;
