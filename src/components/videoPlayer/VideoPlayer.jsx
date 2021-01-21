import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import './VideoPlayer.scss';
import firebase from '../../util/firebase';

function VideoPlayer({ videoURL, roomId }) {
  const [playing, setPlaying] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const videoRef = useRef(null);
  const db = firebase.firestore();
  const docRef = db.collection('partyroom').doc(roomId);

  const updateFirestore = (time) => {
    docRef.update({
      playingTime: time,
    });
  };

  const monitorFirestore = async () => {
    await docRef.onSnapshot((doc) => {
      const playingStatus = doc?.data()?.playing;

      if (typeof videoRef?.current?.getInternalPlayer()?.pauseVideo !== 'function') {
        return;
      }
      videoRef.current.seekTo(doc?.data()?.playingTime);

      if (playingStatus) {
        setPlaying(true);
        videoRef.current.getInternalPlayer().playVideo();
      } else {
        setPlaying(false);
        videoRef.current.getInternalPlayer().pauseVideo();
      }
    });
  };

  const handleOnProgress = (state) => {
    setPlayingTime((prevState) => {
      if (Math.abs(state.playedSeconds - prevState) > 2) {
        updateFirestore(state.playedSeconds);
      }
      return state.playedSeconds;
    });
  };

  useEffect(() => {
    monitorFirestore();
  }, []);

  return (
    <>
      <div className='VideoPlayer'>
        <ReactPlayer
          playing={true}
          ref={videoRef}
          className='react-player'
          url={`${videoURL}`}
          controls
          width='100%'
          height='100%'
          onReady={() => {
            // console.log('onReady callback');
            // console.log('someone joined the room!');
            // console.log('\n');
            docRef.update({
              playing: false,
              playingTime: 0,
            });
          }}
          onStart={() => {
            // console.log('onStart callback');
            // console.log('\n');
            docRef.update({
              playing: true,
              playingTime: 0,
            });
          }}
          onPlay={() => {
            // console.log('onPlay callback');
            // console.log('\n');
          }}
          onPause={() => {
            setPlaying(false);

            // console.log('playing', playing);

            docRef.update({
              playing: false,
              playingTime: videoRef.current.getCurrentTime(),
            });
            // console.log('onPause callback');
            // console.log('\n');
          }}
          // onEnded={() => {
          //   console.log('onEnded callback');
          // }}
          // onError={() => {
          //   console.log('onReady callback');
          // }}
          // onProgress={
          //   handleOnProgress
          //   // () => {
          //   //   console.log('onProgress callback');
          //   //   console.log('\n');
          //   // }
          // }
          // onDuration={(state) => {
          //   console.log(state);
          // }}
          // onSeek={(e) => {
          //   console.log('onseek', e);
          // }}
          onBuffer={() => {
            // setPlaying((prevState) => {
            //   return true;
            // });
            docRef.update({
              playing: true,
              playingTime: videoRef.current.getCurrentTime(),
            });
            // console.log('onBuffer playback');
            //   console.log('playing', playing);
            //   console.log('\n');
          }}
        />
      </div>
      {/* <button onClick={handlePause}>Pause</button>
      <button onClick={handlePlay}>Play</button> */}
    </>
  );
}

export default VideoPlayer;
