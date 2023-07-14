import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Dropdown from '../assets/dropdown.svg';
import DropdownMenu from './DropdownMenu';
import '../styles/Header.css';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const [dropdownShowing, setDropdownShowing] = useState(false);

  const Auth = useContext(AuthContext);

  return (
    <header className="header">
      <p className="logo">SportsBallGame.com</p>
      {Auth.user ? (
        <div className="profileIndicator">
          <ProfilePic image={Auth.user.profilePicURL} />
          <div
            className="dropdownContainer"
            onClick={() => {
              setDropdownShowing(true);
            }}
          >
            <img src={Dropdown} alt="" />
          </div>
          {dropdownShowing && (
            <>
              <DropdownMenu />
              <div
                className="overlay"
                onClick={() => {
                  setDropdownShowing(false);
                }}
              ></div>
            </>
          )}
        </div>
      ) : (
        <div className="signInButtonContainer">
          <Link to="/login" className="login">
            Log In
          </Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
