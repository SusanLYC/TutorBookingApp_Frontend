import './App.css';
import TutorPage from './components/TutorPage';
import GetStarted from './components/GetStarted';
import SignUp from './components/SignUp';
import ClassPage from './components/ClassPage';
import SignIn from './components/SignIn';
import ProfilePage from './components/ProfilePage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import NavigationButton from './components/NavigationButton'; // Import NavigationButton

function App() {
  return (
    <AuthProvider>
      {/* <NavigationButton /> Add NavigationButton */}
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tutor/:searchTerm" element={<TutorPage />} />
        <Route path="/course" element={<ClassPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user-profile" element={<ProfilePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

