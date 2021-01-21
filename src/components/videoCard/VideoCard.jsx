import './VideoCard.scss';

function VideoCard({ video, setUserData }) {
  const { snippet, id } = video;

  const handleClick = () => {
    // setShowModal(true);
  };

  return (
    <>
      <div className='VideoCard' onClick={handleClick} id={id.videoId}>
        <img src={snippet.thumbnails.medium.url} alt={snippet.description} />
        <p className='card-title'>{snippet.title}</p>
      </div>
    </>
  );
}

export default VideoCard;
