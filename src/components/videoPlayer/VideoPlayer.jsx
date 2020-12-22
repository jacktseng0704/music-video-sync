import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import './VideoPlayer.scss';
import firebase from '../../firebase';

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
      // console.log('playing', playing);
      const playingStatus = doc?.data()?.playing;
      // console.log('playingStatus', playingStatus);

      if (typeof videoRef?.current?.getInternalPlayer()?.pauseVideo !== 'function') {
        return;
      }
      videoRef.current.seekTo(doc?.data()?.playingTime);

      if (playingStatus) {
        videoRef.current.getInternalPlayer().playVideo();
      } else {
        videoRef.current.getInternalPlayer().pauseVideo();
      }

      // console.log('\n');
    });
  };

  const handleOnProgress = (state) => {
    // console.log('onProgress callback');
    // console.log(videoRef.current.getCurrentTime());
    setPlayingTime((prevState) => {
      // console.log('Difference', Math.abs(state.playedSeconds - prevState));
      if (Math.abs(state.playedSeconds - prevState) > 2) {
        // console.log('playing', playing);
        updateFirestore(state.playedSeconds);
        // if (playing) {
        //   videoRef.current.getInternalPlayer().playVideo();
        //   docRef.update({
        //     paused: false,
        //   });
        // }
        // docRef.update({
        //   // playingTime: videoRef.current.getCurrentTime(),
        //   playingTime: state.playedSeconds,
        // });
      }
      // console.log('prevState', prevState);
      // console.log('newState', state.playedSeconds);
      // console.log('\n');
      return state.playedSeconds;
    });
  };

  useEffect(() => {
    monitorFirestore();

    // const updatePlayingTime = () => {
    //   docRef.update({
    //     playingTime,
    //   });
    // };

    // window.addEventListener('beforeunload', updatePlayingTime);

    // return () => {
    //   updatePlayingTime();
    //   window.removeEventListener('beforeunload', updatePlayingTime);
    // };
  }, []);

  // console.log('playing time', playingTime);

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
            console.log('onReady callback');
            console.log('someone joined the room!');
            console.log('\n');
          }}
          onStart={() => {
            console.log('onStart callback');
            console.log('\n');
          }}
          onPlay={() => {
            setPlaying(true);

            // setPlaying((prevState) => {
            //   console.log('prevState', prevState);
            docRef.update({
              playing: true,
            });

            //   return true;
            // });
            // console.log('newState', true);

            console.log('onPlay callback');
            console.log('\n');
          }}
          onPause={() => {
            setPlaying(false);

            console.log('playing', playing);

            docRef.update({
              playing: false,
              playingTime: videoRef.current.getCurrentTime(),
            });
            console.log('onPause callback');
            console.log('\n');
          }}
          // onEnded={() => {
          //   console.log('onEnded callback');
          // }}
          // onError={() => {
          //   console.log('onReady callback');
          // }}
          onProgress={
            handleOnProgress
            // () => {
            //   console.log('onProgress callback');
            //   console.log('\n');
            // }
          }
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
            // docRef.update({
            //   playing: true,
            //   playingTime: videoRef.current.getCurrentTime(),
            // });
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
