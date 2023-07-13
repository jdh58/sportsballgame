import { Link } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/Signup.css';
import { useState } from 'react';

export default function Login() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Don't refresh the page
    // Disable the button
    // Request the signup
    // If bad, display the errors, enable the button, and return
    // If good, continue
    // Update the authentication context to have the user with JWT
    // Store the user in localStorage
    // Enable the button
  };

  return (
    <main className="page signupPage">
      <div className="mainContainer">
        <h1>Log in</h1>
        <form action="" className="signupForm" onSubmit={handleFormSubmit}>
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <ul className="errors">
            <li>Please enter the proper thing</li>
          </ul>
          <div className="buttonContainer">
            <Button
              label="Log in"
              type="submit"
              icon=""
              classes="login"
              disabled={isLoading}
            />
            <p>
              <Link to="/login">Forgot password?</Link>
            </p>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
