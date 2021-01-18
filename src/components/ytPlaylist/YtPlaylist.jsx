import { useState, useEffect } from 'react';
import './YtPlaylist.scss';
import { db } from '../../util/firebase';
import { MdDelete } from 'react-icons/md';

function YtPlaylist({ roomId }) {
  const [playList, setPlayList] = useState(null);
  const roomRef = db.collection('partyroom').doc(roomId);
  const playlistRef = roomRef.collection('playlist');

  const renderPlaylist = () => {
    const unsubscribe = playlistRef.orderBy('createdAt').onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      console.log('Current data: ', data);
      setPlayList(data);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    renderPlaylist();
    return () => {
      setPlayList(null);
    };
  }, []);

  return (
    <div className='YtPlaylist YtSearch'>
      {/* <h3>Playlist</h3> */}
      <div className='VideoList'>
        {playList &&
          playList.map((video, index) => <VideoCard video={video} key={index} roomRef={roomRef} />)}
      </div>
    </div>
  );
}

function VideoCard({ video, roomRef }) {
  const { image, title, videoId } = video;

  const handleClick = () => {
    roomRef.update({
      videoId,
      image,
      title,
      playingTime: 0,
    });
  };

  return (
    <div className='VideoCard' onClick={handleClick} id={videoId}>
      <img src={image} alt={title} />
      <p className='card-title'>{title}</p>
      <MdDelete size={30} className='delete-icon' />
    </div>
  );
}

export default YtPlaylist;
