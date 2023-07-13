import Header from './components/Header';
import HomePage from './pages/HomePage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import OptionsPage from './pages/OptionsPage';
import WhoAmI from './pages/WhoAmI';
import GameOver from './pages/GameOver';
import Profile from './pages/Profile';
import LeaderboardPage from './pages/LeaderboardPage';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
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
