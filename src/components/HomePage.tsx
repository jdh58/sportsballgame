import { useState } from 'react';
import { Link } from 'react-router-dom';
import TileButton from './TileButton';
import Footer from './Footer';
import Curry from '../assets/curry.jpg';
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
    <>
      <main className="page homePage">
        <div className="mainContainer">
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
              <TileButton label="Who Am I?" bgImage={null} />
              <TileButton label="Higher or Lower" bgImage={Curry} />
              <TileButton label="More" bgImage={null} />
            </div>
            <div className="separator"></div>
            <div className="right">
              <TileButton label="Profile" bgImage={null} />
              <TileButton label="Leaderboards" bgImage={null} />
              <TileButton label="Settings" bgImage={null} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
