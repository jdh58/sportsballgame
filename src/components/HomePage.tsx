import { useState } from 'react';

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
    </div>
  );
}
