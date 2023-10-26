import { Route, Routes } from 'react-router-dom';
import MainView from './components/MainView.jsx';
import PodcastDetail from './components/PodcastDetail.jsx';
import EpisodeDetail from './components/EpisodeDetail.jsx';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
      </Routes>
    </div>
  )
}

export default App;
