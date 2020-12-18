import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserRoom.scss';
import { db } from '../../firebase';
import UserRoomCard from '../userRoomCard/UserRoomCard';

function UserRoom() {
  const [userRoom, setUserRoom] = useState();
  const { userId } = useParams();

  useEffect(() => {
    let data = [];
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
      <div className='UserRoom'>
        {/* <h2>User id : {userId}</h2> */}
        <h2>Your rooms</h2>
        <div className='room-card'>
          {userRoom && userRoom.map((room, i) => <UserRoomCard key={i} room={room} />)}
        </div>
      </div>
    </>
  );
}

export default UserRoom;
