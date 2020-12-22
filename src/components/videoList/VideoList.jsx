import React from 'react';
import './VideoList.scss';
import VideoCard from '../videoCard/VideoCard';

function VideoList({ videoList, setUserData }) {
  // console.log('Video List: ', videoList);

  return (
    <>
      <main className='MainSection'>
        <h3 className='VideoList-title'>Video List</h3>
        <div className='VideoList'>
          {videoList &&
            (videoList.length === 0 ? (
              <p>No video found</p>
            ) : (
              videoList.map((video, index) => (
                <VideoCard video={video} key={index} setUserData={setUserData} />
              ))
            ))}
        </div>
      </main>
    </>
  );
}

export default VideoList;
