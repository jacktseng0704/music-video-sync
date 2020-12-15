import React, { useState } from 'react';
import './VideoList.scss';
import VideoCard from '../videoCard/VideoCard';

function VideoList({ videoList }) {
  const [showModal, setShowModal] = useState(false);
  // console.log('Video List: ', videoList);

  const handleSubmit = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className='Modal'>
          <form className='modal-form' onSubmit={handleSubmit}>
            <h2>Create a room</h2>
            <input
              className='modal-input'
              type='input'
              placeholder='Enter your name to create a room'
              // onChange={handleChange}
              // value={inputMessage}
            />
            <input className='modal-submit-btn' type='submit' />
          </form>
        </div>
      )}
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
