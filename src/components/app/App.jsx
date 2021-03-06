import { useState, useEffect } from 'react';
import { Route, useHistory, Redirect, Switch } from 'react-router-dom';

import './App.scss';
import AppHeader from '../appHeader/AppHeader';
import PageHeader from '../pageHeader/PageHeader';
import PartyRoom from '../partyRoom/PartyRoom';
import UserRoom from '../userRoom/UserRoom';
import ActiveRoom from '../activeRoom/ActiveRoom';
import GetUserNameForm from '../getUserNameForm/GetUserNameForm';

import { queryActiveRooms } from '../../util/firebase';
import { getUserData } from '../../util/localStorage';

function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [showUserRoom, setShowUserRoom] = useState(false);
  const [userData, setUserData] = useState(getUserData());

  const [loadDB, setLoadDB] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    history.push('/rooms');
  };

  useEffect(() => {
    setLoadDB(true);
    const updateState = (data) => {
      setActiveRoom(data);
      window.setTimeout(() => {
        setLoadDB(false);
      }, 1000);
    };
    const unsubscribe = queryActiveRooms(updateState);
    return unsubscribe;
  }, []);

  return (
    <div className='App'>
      {showUserRoom && <UserRoom setShowUserRoom={setShowUserRoom} />}

      <Switch>
        <Route path='/partyroom/:roomId'>
          <AppHeader setShowUserRoom={setShowUserRoom} />
          {userData ? <PartyRoom /> : <GetUserNameForm setUserData={setUserData} />}
        </Route>

        <Route exact path='/rooms'>
          <AppHeader setShowUserRoom={setShowUserRoom} />
          <main className='main-section'>
            <PageHeader />
            <ActiveRoom loadDB={loadDB} activeRoom={activeRoom} />
          </main>
        </Route>

        <Route exact path='/'>
          <div className='main-image'>
            <div className='content'>
              <h2 className='main-text'>
                Meet friends while listening to music and watching videos!
              </h2>
              <button className='explore-btn' onClick={handleClick}>
                Explore
              </button>
            </div>
          </div>
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
