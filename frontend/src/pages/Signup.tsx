import { Link } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/TextInput.css';
import '../styles/Signup.css';

export default function Signup() {
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <main className="page signupPage">
      <div className="mainContainer">
        <h1>Log in</h1>
        <form action="" className="signupForm" onSubmit={handleFormSubmit}>
          <div className="inputContainer">
            <input type="email" />
          </div>
          <div className="inputContainer">
            <input type="text" />
          </div>
          <div className="inputContainer">
            <input type="password" />
          </div>
          <div className="buttonContainer">
            <Button />
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
