import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import '../styles/HomePage.css';

// This page exists solely to logout the user and redirect them to the home page
export default function Logout() {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);

  useEffect(() => {
    // Delete the user from localStorage
    localStorage.removeItem('user');

    // Dispatch a logout state change
    Auth.dispatch({ type: 'LOGOUT', user: null });

    // Send the user home
    navigate('/');
  }, []);

  return <div className="page homePage"></div>;
}
