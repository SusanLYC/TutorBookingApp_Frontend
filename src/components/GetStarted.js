// src/components/GetStarted.js
import React from 'react';
import '../style/GetStarted.css'; // Add corresponding CSS for styling
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const GetStarted = () => {

  const [searchTerm, setSearchTerm] = React.useState('');

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    // Redirect to search results page
    navigate(`/tutor/${searchTerm}`);
  };
  
  return (
    <Layout showClassBody={true}>
    <div className="get-started">
      <h1>Get Started</h1>
      <p>Welcome to TutorBooking! Here's how to get started:</p>
      <ul>
        <li>1. Browse through our list of available tutors.</li>
        <li>2. Select the tutor that suits your needs.</li>
        <li>3. Book a session and manage your schedule.</li>
        <li>4. Start learning and achieving your goals!</li>
      </ul>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a tutor..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit" onSubmit={handleSearchSubmit}>Find a Tutor</button>

      </form>
    </div>
    </Layout>
  );
};

export default GetStarted;
