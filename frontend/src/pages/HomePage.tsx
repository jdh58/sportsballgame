import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import TileButton from '../components/TileButton';
import Footer from '../components/Footer';
import Curry from '../assets/curry.jpg';
import WhoAmI from '../assets/whoamibackground.png';
import Locker from '../assets/locker.jpg';
import Leaderboard from '../assets/leaderboard.jpg';
import Gears from '../assets/gears.jpg';
import Hoop from '../assets/hoop.jpg';
import '../styles/HomePage.css';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const Auth = useContext(AuthContext);

  return (
    <>
      <main className="page homePage">
        <div className="mainContainer">
          {Auth.user ? (
            <h2 className="welcome">Welcome, {Auth.user.username}!</h2>
          ) : (
            <h2 className="welcome">
              You're currently signed out. <Link to="/login">Log in</Link> or{' '}
              <Link to="/signup">Sign Up</Link>?
            </h2>
          )}
          <div className="optionsContainer">
            <div className="left">
              <TileButton
                label="Who Am I?"
                bgImage={WhoAmI}
                bgColor="55, 5, 5"
              />
              <TileButton
                label="Higher or Lower"
                bgImage={Curry}
                bgColor="20, 20, 2"
              />
              <TileButton label="More" bgImage={Hoop} bgColor="10, 36, 70" />
            </div>
            <div className="right">
              <TileButton label="Profile" bgImage={Locker} bgColor="55, 5, 5" />
              <TileButton
                label="Leaderboards"
                bgImage={Leaderboard}
                bgColor="20, 20, 2"
              />
              <TileButton
                label="Settings"
                bgImage={Gears}
                bgColor="10, 36, 70"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
