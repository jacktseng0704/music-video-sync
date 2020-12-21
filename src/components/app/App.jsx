import React from 'react';
import { useState, useEffect } from 'react';
// import { useState } from 'react';

import './App.scss';
import AppHeader from '../appHeader/AppHeader';
import PageHeader from '../pageHeader/PageHeader';
import VideoList from '../videoList/VideoList';
import PartyRoom from '../partyRoom/PartyRoom';
import UserRoom from '../userRoom/UserRoom';
import ActiveRoom from '../activeRoom/ActiveRoom';
// import { fetchYTVideos } from '../../api/youtube';
import mockdata from '../../api/mockdata.json';
import { Route } from 'react-router-dom';

import { roomRef } from '../../firebase';

function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [showUserRoom, setShowUserRoom] = useState(false);

  const [query, setQuery] = useState('bruno mars');
  // const [videoList, setVideoList] = useState(null);

  // const searchYoutube = async (q) => {
  //   const result = await fetchYTVideos(q);
  //   console.log('AJAX fetch result: ', result);
  //   setVideoList(result.data.items);
  // };

  // useEffect(() => {
  //   console.log('App component run');
  //   console.log(`query: ${query}`);
  //   searchYoutube(query);
  // }, [query]);

  useEffect(() => {
    roomRef.where('activeUser', '!=', []).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log('Current data: ', data);
      setActiveRoom(data);
    });
  }, []);

  console.log('====>activeRoom', activeRoom);

  return (
    <div className='App'>
      <AppHeader query={query} setQuery={setQuery} setShowUserRoom={setShowUserRoom} />
      <Route exact path='/'>
        <div className='main-section'>
          <div className='ActiveRooms'>
            <div className='title'>Active rooms</div>
            {activeRoom &&
              activeRoom.length !== 0 &&
              activeRoom.map((room, i) => <ActiveRoom key={i} room={room} />)}
          </div>
          <div className='right-side'>
            <div className='page-content'>
              <PageHeader />
            </div>
            <hr />
            {/* <VideoList videoList={videoList} /> */}
            <VideoList videoList={mockdata} />
          </div>
        </div>
        {showUserRoom && <UserRoom setShowUserRoom={setShowUserRoom} />}
      </Route>

      <Route path='/partyroom/:roomId'>
        <PartyRoom />
      </Route>
      {/* <Route path='/user/:userId'>
        <UserRoom />
      </Route> */}
    </div>
  );
}

export default App;
