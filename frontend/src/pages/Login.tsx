import { Link } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/Signup.css';

export default function Login() {
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
            <Button label="Log in" type="submit" icon="" classes="login" />
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
