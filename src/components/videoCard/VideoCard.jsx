import React from 'react';
import { useHistory } from 'react-router-dom';
import './VideoCard.scss';
import firebase from '../../firebase';

function VideoCard({ video, setShowModal }) {
  const history = useHistory();
  const db = firebase.firestore();
  const { snippet, id } = video;

  const handleClick = async (e) => {
    // await createRoom(e);
    setShowModal(true);
    console.log('video', video);
  };

  const createRoom = async (e) => {
    console.log('create room for video id: ', e.currentTarget.id);
    const docRef = await db.collection('partyroom').add({
      title: snippet.title,
      videoId: e.currentTarget.id,
    });
    history.push(`/partyroom/${docRef.id}`);
    console.log('Room id: ', docRef.id);
  };

  return (
    <>
      <div className='VideoCard' onClick={handleClick} id={id.videoId}>
        <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
        <p>{snippet.title}</p>
      </div>
    </>
  );
}

export default VideoCard;
