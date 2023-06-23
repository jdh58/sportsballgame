import { useState } from 'react';
import TileButton from './TileButton';
import UserIcon from '../assets/user.svg';
import HigherOrLowerIcon from '../assets/higherorlower.png';
import More from '../assets/more.svg';
import Leaderboard from '../assets/leaderboard.svg';
import Settings from '../assets/settings.svg';

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
    <div className="page homePage">
      {isLoggedIn ? (
        <h2 className="welcome">Welcome, {User.username}</h2>
      ) : (
        <h2 className="welcome">You're currently signed out. </h2>
      )}
      <div className="optionsContainer">
        <TileButton label="Profile" icon={UserIcon} />
        <TileButton label="Higher or Lower" icon={HigherOrLowerIcon} />
        <TileButton label="More" icon={More} />
        <TileButton label="Profile" icon={UserIcon} />
        <TileButton label="Leaderboards" icon={Leaderboard} />
        <TileButton label="Settings" icon={Settings} />
      </div>
    </div>
  );
}
