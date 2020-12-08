import './App.scss';
import AppHeader from '../appHeader/AppHeader';
import PageHeader from '../pageHeader/PageHeader';
import VideoList from '../videoList/VideoList';

function App() {
  return (
    <div className='App'>
      <AppHeader />
      <div className='page-content'>
        <PageHeader />
        <hr />
        <VideoList />
      </div>
    </div>
  );
}

export default App;
