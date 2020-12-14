import React from 'react';
import './ChatMessage.scss';

function ChatMessage({ message }) {
  return (
    <div className='ChatMessage'>
      <span>{message.user}:</span>
      <p>{message.content}</p>
      <span>
        {message.timeSent &&
          new Date(message.timeSent?.seconds * 1000).toLocaleTimeString('zh-Hans-TW')}
      </span>
    </div>
  );
}

export default ChatMessage;
