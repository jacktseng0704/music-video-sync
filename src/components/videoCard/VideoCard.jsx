import React from 'react';
import './VideoCard.scss';

function VideoCard({ video }) {
  const { snippet } = video;
  // console.log(snippet);
  return (
    <div className='VideoCard'>
      <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
      <p>{snippet.title}</p>
    </div>
  );
}

export default VideoCard;
