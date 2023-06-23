import { useState } from 'react';
import { Link } from 'react-router-dom';
import TileButton from './TileButton';
import UserIcon from '../assets/user.svg';
import HigherOrLowerIcon from '../assets/higherorlower.png';
import More from '../assets/more.svg';
import Leaderboard from '../assets/leaderboard.svg';
import Settings from '../assets/settings.svg';
import '../styles/HomePage.css';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get user here
  interface User {
    username: string;
  }

  const User: User = {
    username: '',
  };

  return (
    <main className="page homePage">
      {isLoggedIn ? (
        <h2 className="welcome">Welcome, {User.username}</h2>
      ) : (
        <h2 className="welcome">
          You're currently signed out. <Link to="/signin">Sign in</Link> or{' '}
          <Link to="/signup">Sign up</Link>?
        </h2>
      )}
      <div className="optionsContainer">
        <div className="left">
          <TileButton label="Who Am I?" icon={UserIcon} />
          <TileButton label="Higher or Lower" icon={HigherOrLowerIcon} />
          <TileButton label="More" icon={More} />
        </div>
        <div className="separator"></div>
        <div className="right">
          <TileButton label="Profile" icon={UserIcon} />
          <TileButton label="Leaderboards" icon={Leaderboard} />
          <TileButton label="Settings" icon={Settings} />
        </div>
      </div>
    </main>
  );
}
