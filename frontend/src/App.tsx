import Header from './components/Header';
import HomePage from './pages/HomePage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import OptionsPage from './pages/OptionsPage';
import WhoAmI from './pages/WhoAmI';
import GameOver from './pages/GameOver';
import Profile from './pages/Profile';
import LeaderboardPage from './pages/LeaderboardPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/gameover" element={<GameOver />} />
          <Route path="/whoami/" element={<WhoAmI />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
