import React from 'react';
import { useState, useEffect } from 'react';

import './App.scss';
import AppHeader from '../appHeader/AppHeader';
// import PageHeader from '../pageHeader/PageHeader';
// import VideoList from '../videoList/VideoList';
import PartyRoom from '../partyRoom/PartyRoom';
import UserRoom from '../userRoom/UserRoom';
import ActiveRoom from '../activeRoom/ActiveRoom';
import GetUserNameForm from '../getUserNameForm/GetUserNameForm';
// import { fetchYTVideos } from '../../api/youtube';
// import mockdata from '../../api/mockdata.json';
import { Route, useHistory } from 'react-router-dom';

import { roomRef } from '../../firebase';
import { getUserData } from '../../util/localStorage';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [showUserRoom, setShowUserRoom] = useState(false);
  const [userData, setUserData] = useState(getUserData());

  const [loadDB, setLoadDB] = useState(false);
  // const [loadYT, setLoadYT] = useState(false);
  const [query, setQuery] = useState('bruno mars');
  // const [videoList, setVideoList] = useState(null);

  const history = useHistory();

  // const searchYoutube = async (q) => {
  //   setLoadYT(true);
  //   const result = await fetchYTVideos(q);
  //   console.log('AJAX fetch result: ', result);
  //   setLoadYT(false);
  //   setVideoList(result.data.items);
  // };

  const handleClick = () => {
    history.push('/rooms');
  };

  // useEffect(() => {
  //   console.log('App component run');
  //   console.log(`query: ${query}`);
  //   // searchYoutube(query);
  // }, [query]);

  useEffect(() => {
    setLoadDB(true);
    roomRef.where('activeUser', '!=', []).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log('Current data: ', data);
      setActiveRoom(data);
      window.setTimeout(() => {
        setLoadDB(false);
      }, 2000);
    });
  }, []);

  // console.log('====>activeRoom', activeRoom);

  return (
    <div className='App'>
      <Route exact path='/'>
        <div className='main-image'>
          <div className='content'>
            <h2 className='main-text'>Meet friends while listening music and watching videos!</h2>
            <button className='explore-btn' onClick={handleClick}>
              Explore
            </button>
          </div>
        </div>
      </Route>

      <Route exact path='/rooms'>
        <AppHeader
          query={query}
          setQuery={setQuery}
          setShowUserRoom={setShowUserRoom}
          // searchYoutube={searchYoutube}
          // setLoadYT={setLoadYT}
        />
        <div className='main-section'>
          <div className='main-message'>
            <h3>Join a room</h3>
            <p>Or open a room to invite others</p>
          </div>
          <div className='ActiveRooms'>
            {/* <div className='title'>Active rooms</div> */}
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
          {/* <div className='right-side'>
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
            )} */}
          {/* <VideoList videoList={videoList} /> */}
          {/* <VideoList videoList={mockdata} /> */}
          {/* </div> */}
        </div>
      </Route>
      {showUserRoom && <UserRoom setShowUserRoom={setShowUserRoom} />}

      <Route path='/partyroom/:roomId'>
        <AppHeader
          query={query}
          setQuery={setQuery}
          setShowUserRoom={setShowUserRoom}
          // searchYoutube={searchYoutube}
          // setLoadYT={setLoadYT}
        />
        {userData !== null ? <PartyRoom /> : <GetUserNameForm setUserData={setUserData} />}
      </Route>
      {/* <Route path='/user/:userId'>
        <UserRoom />
      </Route> */}
    </div>
  );
}

export default App;
