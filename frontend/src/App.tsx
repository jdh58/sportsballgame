import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import OptionsPage from './components/OptionsPage';
import WhoAmI from './components/WhoAmI';
import GameOver from './components/GameOver';
import Profile from './components/Profile';
import LeaderboardPage from './components/LeaderboardPage';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gameover" element={<GameOver />} />
          <Route path="/whoami/options" element={<OptionsPage />} />
          <Route path="/whoami/" element={<WhoAmI />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
