import React from 'react';
import '../style/Layout.css';
import NavigationButton from './NavigationButton';
import ClassBody from './ClassBody';

const Layout = ({ children, showClassBody }) => {
  return (
    <div className="flex-wrapper">
      <header className="landing-header">
        <h1>Welcome to TutorBooking</h1>
        <p>Find the perfect tutor for your needs</p>
      </header>
      <main className="main-content">
        <NavigationButton />
        {children}
        {showClassBody && (
          <div className="personalized-content">
            <ClassBody />
          </div>
        )}
      </main>
      <footer className="landing-footer">
        <p>&copy; 2024 TutorBooking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

