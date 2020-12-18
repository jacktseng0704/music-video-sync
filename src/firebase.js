import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const db = firebase.firestore();
export const roomRef = db.collection('partyroom');

// export const getActiveRoom = () => {
//   const roomRef = db.collection('partyroom');

//   roomRef.where("activeUser", "!=", []).onSnapshot((querySnapshot) => {
//     const data = querySnapshot.docs.map((doc) => doc.data());
//     console.log('Current data: ', data);
//   });

//   console.log('=========> get active room');
// }
