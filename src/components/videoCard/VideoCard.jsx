import React, { useState } from 'react';
import './VideoCard.scss';
import ModalForm from '../modalForm/ModalForm';

function VideoCard({ video }) {
  const [showModal, setShowModal] = useState(false);
  const { snippet, id } = video;

  const handleClick = () => {
    setShowModal(true);
    console.log('show modla');
  };

  return (
    <>
      {showModal && <ModalForm setShowModal={setShowModal} video={video} />}
      <div className='VideoCard' onClick={handleClick} id={id.videoId}>
        <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
        <p className='card-title'>{snippet.title}</p>
      </div>
    </>
  );
}

export default VideoCard;
