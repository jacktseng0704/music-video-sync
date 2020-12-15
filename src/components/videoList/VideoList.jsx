import React from 'react';
import './VideoList.scss';
import VideoCard from '../videoCard/VideoCard';

function VideoList({ videoList }) {
  // console.log('Video List: ', videoList);

  return (
    <>
      <h3 className='VideoList-title'>Video List</h3>
      <main className='VideoList'>
        {videoList &&
          (videoList.length === 0 ? (
            <p>No video found</p>
          ) : (
            videoList.map((video, index) => <VideoCard video={video} key={index} />)
          ))}
      </main>
    </>
  );
}

export default VideoList;
