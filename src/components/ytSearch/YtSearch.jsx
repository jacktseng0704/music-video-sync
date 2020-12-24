import React, { useState } from 'react';
import './YtSearch.scss';
import SearchBar from '../searchBar/SearchBar';
import Loader from 'react-loader-spinner';
import { fetchYTVideos } from '../../api/youtube';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

function YtPlayList({ setVideoId }) {
  const [query, setQuery] = useState('');
  const [loadYt, setLoadYt] = useState(false);
  const [videoList, setVideoList] = useState(null);

  const searchYoutube = async (q) => {
    setLoadYt(true);
    const result = await fetchYTVideos(q);
    console.log('AJAX fetch result: ', result);
    setLoadYt(false);
    setVideoList(result.data.items);
  };
  // console.log('videoList', videoList);

  return (
    <div className='YtPlayList'>
      <SearchBar
        query={query}
        setQuery={setQuery}
        className='search-bar'
        searchYoutube={searchYoutube}
      />
      {loadYt && (
        <Loader
          className='loading-yt'
          type='Bars'
          color='#aaa'
          height={80}
          width={80}
          timeout={3000} //3 secs
        />
      )}
      {videoList && <VideoList videoList={videoList} setVideoId={setVideoId} />}
    </div>
  );
}

function VideoList({ videoList, setVideoId }) {
  return (
    <div className='VideoList'>
      {videoList &&
        (videoList.length === 0 ? (
          <p>No video found</p>
        ) : (
          videoList.map((video, index) => (
            <VideoCard video={video} key={index} setVideoId={setVideoId} />
          ))
        ))}
    </div>
  );
}

function VideoCard({ video }) {
  const { roomId } = useParams();
  const { snippet, id } = video;
  const ref = db.collection('partyroom').doc(roomId);

  const handleClick = () => {
    console.log('Change video', id.videoId);
    console.log('roomId', roomId);
    ref.update({
      videoId: id.videoId,
      image: snippet.thumbnails.medium.url,
      title: snippet.title,
    });
    // setVideoId(id.videoId);
  };

  return (
    <div className='VideoCard' onClick={handleClick} id={id.videoId}>
      <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
      <p className='card-title'>{snippet.title}</p>
    </div>
  );
}

export default YtPlayList;
