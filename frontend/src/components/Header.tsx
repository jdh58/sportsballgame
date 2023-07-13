import { useContext, useEffect, useState } from 'react';
import ProfilePic from './ProfilePic';
import Dropdown from '../assets/dropdown.svg';
import '../styles/Header.css';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const Auth = useContext(AuthContext);

  return (
    <header className="header">
      <p className="logo">SportsBallGame.com</p>
      {Auth.user ? (
        <div className="profileIndicator">
          <ProfilePic image={Auth.user.picture} />
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
