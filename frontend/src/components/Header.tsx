import { useState } from 'react';
import ProfilePic from './ProfilePic';
import Dropdown from '../assets/dropdown.svg';
import '../styles/Header.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get user here
  interface User {
    picture: string;
  }

  const User: User = {
    picture: '',
  };

  return (
    <header className="header">
      <p className="logo">SportsBallGame.com</p>
      {isLoggedIn ? (
        <div className="profileIndicator">
          <ProfilePic image={User.picture} />
          <div className="dropdownContainer">
            <img src={Dropdown} alt="" />
          </div>
        </div>
      ) : (
        <div className="signInButtonContainer">
          <button className="signIn">Log In</button>
          <button className="register">Register</button>
        </div>
      )}
    </header>
  );
}