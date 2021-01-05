import React, { useState, useEffect } from 'react';
import './YtSearch.scss';
import SearchBar from '../searchBar/SearchBar';
import Loader from 'react-loader-spinner';
import { fetchYTVideos } from '../../api/youtube';
import { useParams } from 'react-router-dom';
import firebase, { db } from '../../util/firebase';

function YtSearch({ setVideoId }) {
  const [query, setQuery] = useState('2020 top hits');
  const [loadYt, setLoadYt] = useState(false);
  const [videoList, setVideoList] = useState(null);

  const searchYoutube = async (q) => {
    setLoadYt(true);
    const result = await fetchYTVideos(q);
    console.log('AJAX fetch result: ', result);
    setLoadYt(false);
    setVideoList(result.data.items);
  };
  console.log('videoList', videoList);

  useEffect(() => {
    console.log(`query: ${query}`);
    searchYoutube(query);
  }, [query]);

  return (
    <div className='YtSearch'>
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
  const playlistRef = ref.collection('playlist');

  const addSongToFirebase = () => {
    playlistRef.add({
      videoId: id.videoId,
      image: snippet.thumbnails.medium.url,
      title: snippet.title,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const handleClick = () => {
    console.log('Change video', id.videoId);
    console.log('roomId', roomId);

    addSongToFirebase();

    // ref.update({
    //   videoId: id.videoId,
    //   image: snippet.thumbnails.medium.url,
    //   title: snippet.title,
    // });
    // setVideoId(id.videoId);
  };

  return (
    <div className='VideoCard' onClick={handleClick} id={id.videoId}>
      <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
      <p className='card-title'>{snippet.title}</p>
    </div>
  );
}

export default YtSearch;
