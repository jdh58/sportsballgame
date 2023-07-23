import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/Signup.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const Auth = useContext(AuthContext);

  useEffect(() => {
    // If the user is logged in, navigate to home page
    if (Auth.user) {
      navigate('/');
    }
  }, [Auth]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    try {
      // Don't refresh the page
      e.preventDefault();

      // Disable the button
      setIsLoading(true);

      // Extract the email and password from the form
      const form = e.currentTarget;

      // @ts-ignore
      const email: string = form.elements['email'].value;
      // @ts-ignore
      const password: string = form.elements['password'].value;

      // Request the signup and get the data
      const response = await fetch(
        'https://sportsballgame.onrender.com/api/user/login',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();
      /* Response if good should be:
        {
          email:
          username:
          _id:
          token:
        }
    
        If bad:
        {
          error:
        }
        */

      // If bad, display the errors, enable the button, and return
      if (responseData.error) {
        setError(responseData.error);
        setIsLoading(false);
        return;
      }

      // If good, continue

      // Update the authentication context to have the user with JWT
      Auth.dispatch({ type: 'LOGIN', user: responseData });

      // Store the user in localStorage
      localStorage.setItem('user', JSON.stringify(responseData));

      // Enable the button
      setIsLoading(false);

      // Navigate user to the home page
      navigate('/');
    } catch (err) {
      console.error(err);
      // Enable the button
      setIsLoading(false);
    }
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
          {error && (
            <ul className="errors">
              <li>{error}</li>
            </ul>
          )}
          <div className="buttonContainer">
            <Button
              label="Log in"
              type="submit"
              icon=""
              classes="login"
              disabled={isLoading}
              onClick={undefined}
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
