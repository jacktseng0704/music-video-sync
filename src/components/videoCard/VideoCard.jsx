import React, { useState } from 'react';
import './VideoCard.scss';
import ModalForm from '../modalForm/ModalForm';

function VideoCard({ video }) {
  const [showModal, setShowModal] = useState(false);
  const { snippet, id } = video;

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && <ModalForm setShowModal={setShowModal} video={video} />}
      <div className='VideoCard' onClick={handleClick} id={id.videoId}>
        <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
        <p>{snippet.title}</p>
      </div>
    </>
  );
}

export default VideoCard;
