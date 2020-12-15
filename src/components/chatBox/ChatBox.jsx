import React, { useState, useEffect } from 'react';
import './ChatBox.scss';
import firebase from '../../firebase';
import ChatMessage from '../chatMessage/ChatMessage';
import InputBox from '../inputBox/InputBox';

function ChatBox({ roomId }) {
  const [messages, setMessages] = useState(null);

  const db = firebase.firestore();
  const roomRef = db.collection('partyroom').doc(roomId);
  const messagesRef = roomRef.collection('messages');

  useEffect(() => {
    renderMessages();
    return () => {
      setMessages(null);
    };
  }, []);

  const renderMessages = () => {
    const unsubscribe = messagesRef.orderBy('timeSent').onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      console.log('Current data: ', data);
      setMessages(data);
    });
    return () => unsubscribe();
  };

  return (
    <div className='ChatBox'>
      <h3>Chat box</h3>
      <p className='room-id'>roomId: {roomId}</p>
      <div className='messages'>
        {messages &&
          messages.map((message, index) => <ChatMessage message={message} key={index} />)}
      </div>
      <InputBox roomId={roomId} />
    </div>
  );
}

export default ChatBox;
