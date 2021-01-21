import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PartyRoom.scss';
import firebase, { db } from '../../util/firebase';
import { getUserData } from '../../util/localStorage';
import ChatBox from '../chatBox/ChatBox';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import YtSearch from '../ytSearch/YtSearch';
import YtPlaylist from '../ytPlaylist/YtPlaylist';

function Room() {
  const [videoId, setVideoId] = useState('');
  const [activeUser, setActiveUser] = useState();
  const [showMessage, setShowMessage] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { roomId } = useParams();
  const ref = db.collection('partyroom').doc(roomId);
  const activeUserRef = ref.collection('activeUser');
  const youtubeURL = 'https://www.youtube.com/watch?v=';
  const videoURL = `${youtubeURL}${videoId}`;
  const { userId, userName } = getUserData();

  useEffect(() => {
    ref.get().then((doc) => {
      setVideoId(doc.data().videoId);
    });

    ref.onSnapshot((doc) => {
      setVideoId(doc.data().videoId);
    });

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

  const monitorActiveUsers = () => {
    const unsubscribe = activeUserRef.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setActiveUser(data);
    });
    return () => unsubscribe();
  };

  return (
    <>
      <main className='PartyRoom'>
        <div className='toggle-items'>
          <div
            className={`chat-box item ${showMessage && 'selected'}`}
            onClick={() => {
              setShowMessage(true);
              setShowPlaylist(false);
              setShowSearch(false);
            }}>
            Messages
          </div>
          <div
            className={`playlist item ${showPlaylist && 'selected'}`}
            onClick={() => {
              setShowPlaylist(true);
              setShowMessage(false);
              setShowSearch(false);
            }}>
            Playlist
          </div>
          <div
            className={`search item ${showSearch && 'selected'}`}
            onClick={() => {
              setShowSearch(true);
              setShowMessage(false);
              setShowPlaylist(false);
            }}>
            Search
          </div>
        </div>

        {videoId && <VideoPlayer videoURL={videoURL} roomId={roomId} />}

        {showSearch && <YtSearch setVideoId={setVideoId} firebase={ref} />}
        {showMessage && (
          <ChatBox roomId={roomId} activeUser={activeUser} showMessage={showMessage} />
        )}

        {showPlaylist && <YtPlaylist roomId={roomId} />}
      </main>
    </>
  );
}

export default Room;
