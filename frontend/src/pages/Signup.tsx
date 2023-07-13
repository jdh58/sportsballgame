import { Link } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/Signup.css';

export default function Signup() {
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
          <ul className="errors">
            <li>Please enter the proper thing</li>
          </ul>
          <div className="buttonContainer">
            <Button
              label="Create Account"
              type="submit"
              icon=""
              classes="login"
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
