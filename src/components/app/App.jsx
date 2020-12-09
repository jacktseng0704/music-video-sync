import React from 'react';
// import { useState, useEffect } from 'react';
import './App.scss';
// import AppHeader from '../appHeader/AppHeader';
import PageHeader from '../pageHeader/PageHeader';
import VideoList from '../videoList/VideoList';
import PartyRoom from '../partyRoom/PartyRoom';
// import { fetchYTVideos } from '../../api/youtube';
import mockdata from '../../api/mockdata.json';
import { Route } from 'react-router-dom';

function App() {
  // const [query, setQuery] = useState('bruno mars');
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

  return (
    <div className='App'>
      {/* <AppHeader query={query} setQuery={setQuery} /> */}
      <Route exact path='/'>
        <div className='page-content'>
          <PageHeader />
          <hr />
          {/* <VideoList videoList={videoList} /> */}
          <VideoList videoList={mockdata} />
        </div>
      </Route>

      <Route path='/partyroom/:roomId'>
        <PartyRoom />
      </Route>
    </div>
  );
}

export default App;
