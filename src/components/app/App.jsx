// import { useState, useEffect } from 'react';
import './App.scss';
// import AppHeader from '../appHeader/AppHeader';
import PageHeader from '../pageHeader/PageHeader';
import VideoList from '../videoList/VideoList';
// import { fetchYTVideos } from '../../api/youtube';
import mockdata from '../../api/mockdata.json';

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
      <div className='page-content'>
        <PageHeader />
        <hr />
        {/* <VideoList videoList={videoList} /> */}
        <VideoList videoList={mockdata} />
      </div>
    </div>
  );
}

export default App;
