import React from 'react';
import { useParams } from 'react-router-dom';

function Room() {
  let { roomId } = useParams();
  console.log(roomId);

  return (
    <>
      <h3>Party room id: {roomId}</h3>
    </>
  );
}

export default Room;
