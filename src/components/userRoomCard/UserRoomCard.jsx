import './UserRoomCard.scss';
import { useHistory } from 'react-router-dom';

function UserRoomCard({ room, setShowUserRoom }) {
  const { roomId, title, image } = room;
  const history = useHistory();
  const handleClick = () => {
    setShowUserRoom((prevState) => !prevState);
    history.push(`/partyroom/${roomId}`);
    // console.log(`redirect to room with id ${roomId}`);
  };
  // console.log('user room', room);

  return (
    <>
      <div className='UserRoomCard' onClick={handleClick}>
        <img src={image} alt={title} />

        {/* <div className='room-id'>roomId: {roomId}</div> */}
        <div className='video-title'>{title}</div>
      </div>
    </>
  );
}

export default UserRoomCard;
