import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import '../style/SignIn.css';
import ClassCard from './ClassCard';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userSessions, setUserSessions] = useState([]);

  const [newSession, setNewSession] = useState({
    sessionName: '',
    sessionDescription: '',
    startDate: '',
    endDate: '',
    frequency: 'DAILY',
    duration: 1,
    status: 'AVAILABLE'
  });

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      const parsedProfile = JSON.parse(storedUserProfile);
      setUserProfile(parsedProfile);
      fetchUserSessions(parsedProfile.userId);
    }
  }, []);

  const fetchUserSessions = (userId) => {
    fetch(`http://localhost:8080/api/v1/session/users/${userId}/sessions`)
      .then((response) => response.json())
      .then((sessions) => setUserSessions(sessions))
      .catch((error) => console.error('Error fetching user sessions:', error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'duration') {
      setNewSession({
        ...newSession,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setNewSession({
        ...newSession,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tutorId = userProfile ? userProfile.userId : 0;

    fetch(`http://localhost:8080/api/v1/session/createcourse?tutorId=${tutorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSession),
    })
      .then(response => response.ok ? alert('Course created successfully!') : response.text().then(text => alert('Failed to create course: ' + text)))
      .then(() => fetchUserSessions(tutorId)) // Refresh sessions after creation
      .catch(error => console.error('Error creating course:', error));
  };

  const handleUpdate = () => {
    if (userProfile) {
      fetchUserSessions(userProfile.userId); // Refresh sessions after update
    }
  };

  const handleDelete = (sessionId) => {
    fetch(`http://localhost:8080/api/v1/session/${sessionId}/delete`, {
      method: 'DELETE',
    })
      .then(response => response.ok ? alert('Course deleted successfully!') : response.text().then(text => alert('Failed to delete course: ' + text)))
      .then(() => {
        if (userProfile) {
          fetchUserSessions(userProfile.userId); // Refresh sessions after deletion
        }
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  if (!userProfile) {
    return (
      <Layout showClassBody={false}>
        <div className="sign-in">
          <h2>No user profile available.</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showClassBody={false}>
      <div className="sign-in">
        <h2>User Profile</h2>
        <p><strong>Username:</strong> {userProfile.username}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Role:</strong> {userProfile.role}</p>

        <div className="user-sessions">
          <h3>{userProfile.role === 'TUTOR' ? 'Owned Sessions' : 'Enrolled Sessions'}</h3>
          {userSessions.length > 0 ? (
            <div className="classCardContainer">
              {userSessions.map((session) => (
                console.log(session),
                <ClassCard
                key={session.sessionId}
                sessionId={session.sessionId}
                name={session.sessionName}
                description={session.sessionDescription}
                dateStart={session.startDate}
                dateEnd={session.endDate}
                frequency={session.frequency}
                duration={session.duration}
                status={session.status}
                userProfile={userProfile}
                onDelete={() => handleDelete(session.sessionId)} // Pass delete handler
                onUpdate={handleUpdate} // Pass update handler
                tutorUsername={session.tutorUsername} // Add tutor info
                tutorEmail={session.tutorEmail}
                tutorDescription={session.tutorDescription}
                isProfilePage={userProfile.role === 'TUTOR'} // Indicate that this is the profile page
              />              
              ))}
            </div>
          ) : (
            <p>No sessions available.</p>
          )}
        </div>

        {userProfile.role === 'TUTOR' && (
          <div className="create-course">
            <h3>Create a New Course</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Session Name:
                <input
                  type="text"
                  name="sessionName"
                  value={newSession.sessionName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Session Description:
                <textarea
                  name="sessionDescription"
                  value={newSession.sessionDescription}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Start Date:
                <input
                  type="date"
                  name="startDate"
                  value={newSession.startDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  name="endDate"
                  value={newSession.endDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Frequency:
                <select name="frequency" value={newSession.frequency} onChange={handleChange}>
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </label>
              <label>
                Duration (hours):
                <input
                  type="number"
                  name="duration"
                  value={newSession.duration}
                  onChange={handleChange}
                  required
                  min="0.5"
                  step="0.25"
                />
              </label>
              <label>
                Status:
                <select name="status" value={newSession.status} onChange={handleChange}>
                  <option value="AVAILABLE">Available</option>
                  <option value="FULL">Full</option>
                </select>
              </label>
              <button type="submit">Create Course</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
