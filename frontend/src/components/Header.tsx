import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Dropdown from '../assets/dropdown.svg';
import DropdownMenu from './DropdownMenu';
import '../styles/Header.css';
import { AuthContext } from '../context/AuthContext';

import Menu from '../assets/menu.svg';

export default function Header() {
  const [dropdownShowing, setDropdownShowing] = useState(false);

  const Auth = useContext(AuthContext);

  return (
    <header className="header">
      {Auth.user && (
        <div className="menuContainerContainer">
          <div
            className="menuContainer"
            onClick={() => {
              setDropdownShowing(true);
            }}
          >
            <img src={Menu} alt="" />
          </div>
          {dropdownShowing && (
            <>
              <DropdownMenu
                killMenu={() => {
                  setDropdownShowing(false);
                }}
              />
              <div
                className="overlay"
                onClick={() => {
                  setDropdownShowing(false);
                }}
              ></div>
            </>
          )}
        </div>
      )}
      <Link to="/" className="logo">
        SportsBallGame.com
      </Link>
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
              <DropdownMenu
                killMenu={() => {
                  setDropdownShowing(false);
                }}
              />
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
