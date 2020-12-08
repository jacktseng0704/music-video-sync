import React, { useState, useEffect } from 'react';
import './VideoList.scss';
import { loadYTVideos } from '../../api/youtube';

function VideoList() {
  const [ytVideos, setYTVideos] = useState([]);

  const searchYoutube = async (q) => {
    const result = await loadYTVideos(q);
    console.log(result);
    setYTVideos(result.data.items);
  };
  console.log(ytVideos);

  useEffect(() => {
    searchYoutube('bruno mars');
  }, []);

  return (
    <main className='VideoList'>
      <h3 className='title'>Video List</h3>
    </main>
  );
}

export default VideoList;
