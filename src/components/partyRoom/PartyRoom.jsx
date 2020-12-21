import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PartyRoom.scss';
import firebase, { db } from '../../firebase';
import { getUserData } from '../../util/localStorage';
import ChatBox from '../chatBox/ChatBox';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import { HiShare } from 'react-icons/hi';

function Room() {
  const [videoId, setVideoId] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [activeUser, setActiveUser] = useState();
  const { userId, userName } = getUserData();

  const { roomId } = useParams();
  const ref = db.collection('partyroom').doc(roomId);
  const activeUserRef = ref.collection('activeUser');
  let youtubeURL = 'https://www.youtube.com/watch?v=';
  let videoURL = `${youtubeURL}${videoId}`;
  // console.log('roomId', roomId);

  useEffect(() => {
    ref.get().then((doc) => {
      // console.log(doc.data());
      setVideoId(doc.data().videoId);
      // setActiveUser(doc.data().activeUser);
    });

    // activeUserRef.onSnapshot();

    ref.update({
      activeUser: firebase.firestore.FieldValue.arrayUnion(userId),
    });

    activeUserRef.doc(userId).set({
      userId,
      userName,
    });

    monitorActiveUsers();

    const updateUserStatus = () => {
      activeUserRef.doc(userId).delete();
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
  // console.log('active users:', activeUser);

  const monitorActiveUsers = () => {
    const unsubscribe = activeUserRef.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      console.log('Current data: ', data);
      setActiveUser(data);
    });
    return () => unsubscribe();
  };
  console.log('active users:', activeUser);

  const copyURL = () => {
    const URL = window.location.href;
    textToClipboard(URL);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const textToClipboard = (text) => {
    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <>
      <div className='info-box'>
        <h2>Welcome to the room!</h2>
        <div className='info-card info-card1'>Bruno Mars</div>
      </div>
      <div className='active-users'>
        <h3 className='title'>Users in the room</h3>
        {activeUser &&
          activeUser.length &&
          activeUser.map((user) => <div className='user-name'>{user.userName}</div>)}
      </div>
      <main className='PartyRoom'>
        <div className='share-link'>
          <p>Click the icon to invite your friends</p>
          <HiShare className='share-icon' size={20} onClick={copyURL} />
          {showNotification && <div className='notification'>Copied link!</div>}
        </div>
        {/* <h3>Party room id: {roomId}</h3> */}
        {videoId && <VideoPlayer videoURL={videoURL} roomId={roomId} />}

        <ChatBox roomId={roomId} />
      </main>
    </>
  );
}

export default Room;
