import { useState } from 'react';
import ProfilePic from './ProfilePic';

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
    <header>
      <div className="logoContainer">
        <img src="" alt="return home" className="logo" />
      </div>
      {isLoggedIn ? (
        <div className="profileIndicator">
          <ProfilePic image={User.picture} />
        </div>
      ) : (
        <div className="signInButtonContainer">
          <button className="signIn">Sign In</button>
          <button className="signOut">Sign Out</button>
        </div>
      )}
    </header>
  );
}
