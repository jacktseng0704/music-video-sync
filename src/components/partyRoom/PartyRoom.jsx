import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PartyRoom.scss';
import firebase, { db } from '../../firebase';
import { getUserId } from '../../util/localStorage';
import ChatBox from '../chatBox/ChatBox';
import VideoPlayer from '../videoPlayer/VideoPlayer';

function Room() {
  const [videoId, setVideoId] = useState('');
  const [activeUser, setActiveUser] = useState();
  const userId = getUserId();

  const { roomId } = useParams();
  const ref = db.collection('partyroom').doc(roomId);
  let youtubeURL = 'https://www.youtube.com/watch?v=';
  let videoURL = `${youtubeURL}${videoId}`;
  // console.log('roomId', roomId);

  useEffect(() => {
    ref.get().then((doc) => {
      // console.log(doc.data());
      setVideoId(doc.data().videoId);
      setActiveUser(doc.data().activeUser);
    });

    ref.update({
      activeUser: firebase.firestore.FieldValue.arrayUnion(userId),
    });

    const updateUserStatus = () => {
      ref.update({
        activeUser: firebase.firestore.FieldValue.arrayRemove(userId),
      });
    };

    window.addEventListener('beforeunload', updateUserStatus);

    return () => {
      updateUserStatus();
      window.removeEventListener('beforeunload', updateUserStatus);
    };
  }, []);
  console.log('user id:', userId);
  console.log('active users:', activeUser);

  return (
    <>
      <main className='PartyRoom'>
        <h3>Party room id: {roomId}</h3>
        {videoId && <VideoPlayer videoURL={videoURL} roomId={roomId} />}
        <div className='active-users'>
          <h3 className='title'>Users in the room</h3>
          {activeUser && activeUser.map((user) => <div>{user}</div>)}
        </div>
        <ChatBox roomId={roomId} />
      </main>
    </>
  );
}

export default Room;
