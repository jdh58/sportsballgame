import { useState } from 'react';
import ProfilePic from './ProfilePic';
import Dropdown from '../assets/dropdown.svg';
import Curry from '../assets/curry.jpg';
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
        <div className="profileIndicator">
          <ProfilePic image={Curry} />
          <div className="dropdownContainer">
            <img src={Dropdown} alt="" />
          </div>
        </div>
        // <div className="signInButtonContainer">
        //   <button className="signIn">Sign In</button>
        //   <button className="signOut">Sign Out</button>
        // </div>
      )}
    </header>
  );
}
