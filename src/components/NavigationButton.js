import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import '../style/NavigationButton.css';

const NavigationButton = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const currentPath = location.pathname;

  return (
    <div className="nav-container">
      <button className="nav-button" onClick={toggleNav}>
        {isNavOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      {isNavOpen && (
        <nav className="nav">
          <div>
            {currentPath !== '/' && <Link to="/">Home</Link>}
            {!isAuthenticated && (
              <>
                {currentPath !== '/signin' && <Link to="/signin">Sign In</Link>}
                {currentPath !== '/signup' && <Link to="/signup">Sign Up</Link>}
              </>
            )}
            {currentPath !== '/course' && <Link to="/course">Course</Link>}
            {isAuthenticated && (
              <>
                {currentPath !== '/user-profile' && <Link to="/user-profile">Profile</Link>}
                <button onClick={() => {
                  logout();
                  // Optionally redirect to another page after logout
                }}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavigationButton;
