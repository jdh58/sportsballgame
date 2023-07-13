import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

import '../styles/Signup.css';
import { useContext, useState } from 'react';

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const Auth = useContext(AuthContext);

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

      console.log(JSON.stringify({ email, password }));
      // Request the signup and get the data
      const response = await fetch('http://localhost:3100/api/user/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

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
      localStorage.setItem('user', JSON.stringify(Auth.user));

      // Enable the button
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      // Enable the button
      setIsLoading(false);
    }
  };

  return (
    <main className="page signupPage">
      <div className="mainContainer">
        <h1>Sign up</h1>
        <form action="" className="signupForm" onSubmit={handleFormSubmit}>
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="inputContainer">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <ul className="errors">{error && <li>{error}</li>}</ul>
          <div className="buttonContainer">
            <Button
              label="Create Account"
              type="submit"
              icon=""
              classes="signup"
              disabled={isLoading}
            />
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
