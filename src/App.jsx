import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from './components/MainView';
import PodcastDetail from './components/PodcastDetail';
import EpisodeDetail from './components/EpisodeDetail';
import './App.css'

function App() {

  return (
    <Router>
    <div>
      <Switch>
        <Route path="/" exact component={MainView} />
        <Route path="/podcast/:podcastId" component={PodcastDetail} />
        <Route path="/podcast/:podcastId/episode/:episodeId" component={EpisodeDetail} />
      </Switch>
    </div>
  </Router>
  )
}

export default App
