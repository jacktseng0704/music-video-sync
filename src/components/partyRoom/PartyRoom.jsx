import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import './PartyRoom.scss';
import firebase from '../../firebase';
import ChatBox from '../chatBox/ChatBox';

function Room() {
  const [videoId, setVideoId] = useState('');
  const { roomId } = useParams();
  const db = firebase.firestore();
  const ref = db.collection('partyroom').doc(roomId);
  let youtubeURL = 'https://www.youtube.com/watch?v=';
  console.log('roomId', roomId);

  useEffect(() => {
    // db.collection('partyroom').onSnapshot((snapshot) => {
    //   console.log(snapshot);
    // });
    ref.get().then((doc) => {
      console.log(doc.data());
      setVideoId(doc.data().videoId);
    });
  }, []);

  return (
    <>
      <main className='PartyRoom'>
        <h3>Party room id: {roomId}</h3>
        {videoId && <ReactPlayer url={`${youtubeURL}${videoId}`} controls />}
        <ChatBox />
      </main>
    </>
  );
}

export default Room;
