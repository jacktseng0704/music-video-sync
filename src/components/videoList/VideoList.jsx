import React, { useState } from 'react';
import './VideoList.scss';
import VideoCard from '../videoCard/VideoCard';
import ModalForm from '../modalForm/ModalForm';

function VideoList({ videoList }) {
  const [showModal, setShowModal] = useState(false);
  // console.log('Video List: ', videoList);

  return (
    <>
      {showModal && <ModalForm setShowModal={setShowModal} />}
      <h3 className='VideoList-title'>Video List</h3>
      <main className='VideoList'>
        {videoList &&
          (videoList.length === 0 ? (
            <p>No video found</p>
          ) : (
            videoList.map((video, index) => (
              <VideoCard video={video} key={index} setShowModal={setShowModal} />
            ))
          ))}
      </main>
    </>
  );
}

export default VideoList;
