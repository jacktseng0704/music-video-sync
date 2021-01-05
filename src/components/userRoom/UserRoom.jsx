import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import './UserRoom.scss';
import { db } from '../../util/firebase';
import { getUserData } from '../../util/localStorage';
import UserRoomCard from '../userRoomCard/UserRoomCard';

function UserRoom({ setShowUserRoom }) {
  const [userRoom, setUserRoom] = useState();
  // const { userId } = useParams();

  useEffect(() => {
    const { userId } = getUserData();
    const data = [];
    db.collection('partyroom')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setUserRoom(data);
      });
  }, []);

  console.log(userRoom);

  return (
    <>
      <div
        className='cover'
        onClick={() => {
          setShowUserRoom((prevState) => !prevState);
        }}></div>
      <div className='UserRoom'>
        {/* <h2>User id : {userId}</h2> */}
        <div className='user-room'>
          <h2>Your rooms</h2>
          <div className='room-card'>
            {userRoom &&
              userRoom.map((room, i) => (
                <UserRoomCard key={i} room={room} setShowUserRoom={setShowUserRoom} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRoom;
