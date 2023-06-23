import { useState } from 'react';
import TileButton from './TileButton';
import UserIcon from '../assets/user.svg';

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
        {/* <TileButton label="Higher or Lower" icon={null} />
        <TileButton label="More" icon={null} />
        <TileButton label="Profile" icon={null} />
        <TileButton label="Leaderboards" icon={null} />
        <TileButton label="Settings" icon={null} /> */}
      </div>
    </div>
  );
}
