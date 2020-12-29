import React from 'react';
import './ActiveRoom.scss';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

function ActiveRoom({ activeRoom, loadDB }) {
  // console.log('----->room:', room);
  return (
    <>
      <div className='ActiveRoom'>
        {loadDB ? (
          <Loader
            className='loading-db'
            type='Bars'
            color='#aaa'
            height={80}
            width={80}
            timeout={3000}
          />
        ) : (
          activeRoom &&
          activeRoom.length !== 0 &&
          activeRoom.map((room, i) => <RoomCard key={i} room={room} />)
        )}
      </div>
    </>
  );
}

function RoomCard({ room }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/partyroom/${room.roomId}`);
  };

  return (
    <div className='active-room' onClick={handleClick}>
      <div className='room-img'>
        <img src={room.image} alt={room.title} />
      </div>
      <div className='room-video'>{room.title}</div>
      <div className='user-number'>active users: {room.activeUser.length}</div>
      <div className='host'>host: {room.userName}</div>
    </div>
  );
}

export default ActiveRoom;
