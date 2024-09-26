import ClassCard from './ClassCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

const ClassBody = ({ sessionId, onBook }) => {
  const [classes, setClasses] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Retrieve user profile from localStorage
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      const parsedProfile = JSON.parse(storedUserProfile);
      setUserProfile(parsedProfile);
    }

    // Fetch sessions
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const url = `${apiUrl}/api/v1/session`;

    axios.get(url)
      .then(response => {
        const sessions = response.data.map(session => ({
          ...session,
          startDate: new Date(session.startDate[0], session.startDate[1] - 1, session.startDate[2]).toDateString(),
          endDate: new Date(session.endDate[0], session.endDate[1] - 1, session.endDate[2]).toDateString(),
        }));
        if (sessionId) {
          const filteredSession = sessions.filter((session) => session.sessionId === sessionId);
          setClasses(filteredSession);
        } else {
          setClasses(sessions);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [sessionId]);


  const handleBookClick = (sessionId) => {
    console.log('handleBookClick triggered with sessionId:', sessionId); // Debugging
  
    if (sessionId === undefined) {
      console.error('Session ID is undefined');
      alert('Unable to book the course. Please try again.');
      return;
    }
  
    if (userProfile) {
      if (userProfile.role === 'STUDENT') {
        fetch(`http://localhost:8080/api/v1/users/${userProfile.userId}/sessions/${sessionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          if (response.ok) {
            alert('Successfully booked the course.');
            if (onBook) {
              onBook(); // Call the onBook callback if available
            }
          } else {
            response.text().then(text => alert('Failed to book the course: ' + text));
          }
        })
        .catch(error => console.error('Error booking course:', error));
      } else {
        alert('You are signed in but you are not a student.');
      }
    } else {
      alert('Please sign in to book this course.');
    }
  };

  return (
    <div className="App">
      {classes.map((classItem) => (
        console.log(classItem),
        <ClassCard
          key={classItem.sessionId} // Use sessionId as the unique key
          sessionId={classItem.sessionId}
          name={classItem.sessionName}
          description={classItem.sessionDescription}
          dateStart={classItem.startDate}
          dateEnd={classItem.endDate}
          frequency={classItem.frequency}
          duration={classItem.duration}
          status={classItem.status}
          tutorUsername={classItem.tutorUsername} // Pass tutorUsername
          tutorEmail={classItem.tutorEmail}       // Pass tutorEmail
          tutorDescription={classItem.tutorDescription} // Pass tutorDescription
          userProfile={userProfile}
          onBook={(id) => handleBookClick(id)}
          showBookButton={userProfile && 
                          userProfile.role === 'STUDENT' } // Show button if student and not on profile page
        />
      ))}
    </div>
  );
};

export default ClassBody;
