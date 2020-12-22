import React from 'react';
import { useState, useEffect } from 'react';

import './App.scss';
import AppHeader from '../appHeader/AppHeader';
import PageHeader from '../pageHeader/PageHeader';
import VideoList from '../videoList/VideoList';
import PartyRoom from '../partyRoom/PartyRoom';
import UserRoom from '../userRoom/UserRoom';
import ActiveRoom from '../activeRoom/ActiveRoom';
import GetUserNameForm from '../getUserNameForm/GetUserNameForm';
import { fetchYTVideos } from '../../api/youtube';
// import mockdata from '../../api/mockdata.json';
import { Route } from 'react-router-dom';

import { roomRef } from '../../firebase';
import { getUserData } from '../../util/localStorage';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [showUserRoom, setShowUserRoom] = useState(false);
  const [userData, setUserData] = useState(getUserData());

  const [loadDB, setLoadDB] = useState(false);
  const [loadYT, setLoadYT] = useState(false);
  const [query, setQuery] = useState('bruno mars');
  const [videoList, setVideoList] = useState(null);

  const searchYoutube = async (q) => {
    setLoadYT(true);
    const result = await fetchYTVideos(q);
    console.log('AJAX fetch result: ', result);
    setLoadYT(false);
    setVideoList(result.data.items);
  };

  useEffect(() => {
    console.log('App component run');
    console.log(`query: ${query}`);
    searchYoutube(query);
  }, [query]);

  useEffect(() => {
    setLoadDB(true);
    roomRef.where('activeUser', '!=', []).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log('Current data: ', data);
      setActiveRoom(data);
      setLoadDB(false);
    });
  }, []);

  // console.log('====>activeRoom', activeRoom);

  return (
    <div className='App'>
      <AppHeader
        query={query}
        setQuery={setQuery}
        setShowUserRoom={setShowUserRoom}
        searchYoutube={searchYoutube}
        setLoadYT={setLoadYT}
      />
      <Route exact path='/'>
        <div className='main-section'>
          <div className='ActiveRooms'>
            <div className='title'>Active rooms</div>
            {loadDB ? (
              <Loader
                className='loading-db'
                type='Bars'
                color='#aaa'
                height={80}
                width={80}
                timeout={3000} //3 secs
              />
            ) : (
              activeRoom &&
              activeRoom.length !== 0 &&
              activeRoom.map((room, i) => (
                <ActiveRoom key={i} room={room} userData={userData} setUserData={setUserData} />
              ))
            )}
          </div>
          <div className='right-side'>
            <div className='page-content'>
              <PageHeader />
            </div>
            <hr />
            {loadYT ? (
              <Loader
                className='loading-yt'
                type='Bars'
                color='#aaa'
                height={80}
                width={80}
                timeout={3000} //3 secs
              />
            ) : (
              <VideoList videoList={videoList} setUserData={setUserData} />
            )}
            {/* <VideoList videoList={videoList} /> */}
            {/* <VideoList videoList={mockdata} /> */}
          </div>
        </div>
        {showUserRoom && <UserRoom setShowUserRoom={setShowUserRoom} />}
      </Route>

      <Route path='/partyroom/:roomId'>
        {userData !== null ? <PartyRoom /> : <GetUserNameForm setUserData={setUserData} />}
      </Route>
      {/* <Route path='/user/:userId'>
        <UserRoom />
      </Route> */}
    </div>
  );
}

export default App;
