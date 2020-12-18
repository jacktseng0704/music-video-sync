import React, { useState, useEffect } from 'react';
import './VideoList.scss';
import VideoCard from '../videoCard/VideoCard';
import ActiveRoom from '../activeRoom/ActiveRoom';
import { roomRef } from '../../firebase';

function VideoList({ videoList }) {
  const [activeRoom, setActiveRoom] = useState(null);

  // console.log('Video List: ', videoList);
  useEffect(() => {
    roomRef.where('activeUser', '!=', []).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log('Current data: ', data);
      setActiveRoom(data);
    });
  }, []);
  console.log('====>activeRoom', activeRoom);

  return (
    <>
      <main className='MainSection'>
        {activeRoom &&
          activeRoom.length !== 0 &&
          activeRoom.map((room, i) => <ActiveRoom key={i} room={room} />)}
        <h3 className='VideoList-title'>Video List</h3>
        <div className='VideoList'>
          {videoList &&
            (videoList.length === 0 ? (
              <p>No video found</p>
            ) : (
              videoList.map((video, index) => <VideoCard video={video} key={index} />)
            ))}
        </div>
      </main>
    </>
  );
}

export default VideoList;
