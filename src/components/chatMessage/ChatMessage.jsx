import React from 'react';
import './ChatMessage.scss';
import { getUserData } from '../../util/localStorage';

function ChatMessage({ message }) {
  const { userId } = getUserData();

  return (
    <div className='ChatMessage'>
      <div className='chat-user'>{message.user}: </div>
      <p>{message.content}</p>
      {/* <div className='message-time'>
        {message.timeSent &&
          new Date(message.timeSent?.seconds * 1000).toLocaleTimeString('zh-Hans-TW')}
      </div> */}
    </div>
  );
}

export default ChatMessage;
