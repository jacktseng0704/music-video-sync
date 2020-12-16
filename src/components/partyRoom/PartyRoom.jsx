import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PartyRoom.scss';
import { db } from '../../firebase';
import ChatBox from '../chatBox/ChatBox';
import VideoPlayer from '../videoPlayer/VideoPlayer';

function Room() {
  const [videoId, setVideoId] = useState('');

  const { roomId } = useParams();
  const ref = db.collection('partyroom').doc(roomId);
  let youtubeURL = 'https://www.youtube.com/watch?v=';
  let videoURL = `${youtubeURL}${videoId}`;
  // console.log('roomId', roomId);

  useEffect(() => {
    ref.get().then((doc) => {
      // console.log(doc.data());
      setVideoId(doc.data().videoId);
    });
  }, []);

  return (
    <>
      <main className='PartyRoom'>
        <h3>Party room id: {roomId}</h3>
        {videoId && <VideoPlayer videoURL={videoURL} roomId={roomId} />}
        <ChatBox roomId={roomId} />
      </main>
    </>
  );
}

export default Room;
