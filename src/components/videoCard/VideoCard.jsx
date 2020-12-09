import React from 'react';
import './VideoCard.scss';
import firebase from '../../firebase';

function VideoCard({ video }) {
  const { snippet, id } = video;

  const createRoom = (e) => {
    console.log('room created for video with id: ', e.currentTarget.id);
    firebase.firestore().collection('videos').add({
      title: 'Working',
      videoId: e.currentTarget.id,
    });
  };

  return (
    <div className='VideoCard' onClick={createRoom} id={id.videoId}>
      <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
      <p>{snippet.title}</p>
    </div>
  );
}

export default VideoCard;
