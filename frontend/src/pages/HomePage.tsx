import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TileButton from '../components/TileButton';
import Footer from '../components/Footer';
import Curry from '../assets/curry.jpg';
import WhoAmI from '../assets/whoamibackground.png';
import Locker from '../assets/locker.jpg';
import Leaderboard from '../assets/leaderboard.jpg';
import Refs from '../assets/refs.jpg';
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
                redirect="/whoami"
                disabled={false}
              />
              <TileButton
                label="Higher or Lower"
                bgImage={Curry}
                bgColor="20, 20, 2"
                redirect="/"
                disabled={true}
              />
              <TileButton
                label="More"
                bgImage={Hoop}
                bgColor="10, 36, 70"
                redirect="/"
                disabled={true}
              />
            </div>
            <div className="right">
              <TileButton
                label="Profile"
                bgImage={Locker}
                bgColor="55, 5, 5"
                redirect={
                  Auth.user ? `/profile/${Auth.user?.username}` : '/signup'
                }
                disabled={false}
              />
              <TileButton
                label="Leaderboards"
                bgImage={Leaderboard}
                bgColor="20, 20, 2"
                redirect="/leaderboard"
                disabled={false}
              />
              <TileButton
                label="Contact & Support"
                bgImage={Refs}
                bgColor="10, 36, 70"
                redirect="/contact"
                disabled={false}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
