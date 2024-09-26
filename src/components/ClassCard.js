import React, { useState } from 'react';
import '../style/ClassCard.css';

const ClassCard = (props) => {
    const { sessionId, name, description, 
            dateStart, dateEnd, frequency, duration, status, 
            tutorUsername, tutorEmail, tutorDescription, 
            userProfile, onDelete, onUpdate, onBook, showBookButton, isProfilePage } = props;

    const formattedDateStart = new Date(dateStart[0], dateStart[1] - 1, dateStart[2]).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedDateEnd = new Date(dateEnd[0], dateEnd[1] - 1, dateEnd[2]).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [newStatus, setNewStatus] = useState(status);

    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
    };

    const handleUpdateClick = () => {
        if (!sessionId || !newStatus) {
            alert('Session ID or status is undefined');
            return;
        }
        fetch(`http://localhost:8080/api/v1/session/${sessionId}/updatestatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => response.ok ? alert('Course status updated successfully!') : response.text().then(text => alert('Failed to update course status: ' + text)))
        .then(() => onUpdate()) // Call the onUpdate callback
        .catch(error => console.error('Error updating course status:', error));
    };

    const handleDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            onDelete();
        }
    };

    const handleBookClick = () => {
        if(onBook) {
            onBook(sessionId);
        } else {
            alert('Booking function is not implemented.');
        }
    };

    return (
        <div className="classCard">
            <div className="header">
                <h3>{name}</h3>
                <h4>"{description}"</h4>
            </div>
            <div className="divider"></div>
            <div className="details-container">
                <div className="class-details">
                    <p><strong>Start Date:</strong> {formattedDateStart}</p>
                    <p><strong>End Date:</strong> {formattedDateEnd}</p>
                    <p><strong>Frequency:</strong> {frequency}</p>
                    <p><strong>Duration:</strong> {duration} hour(s)</p>
                    <p><strong>Status:</strong> {status}</p>
                </div>
                {userProfile && userProfile.role !== 'TUTOR' && !isProfilePage && (
                    <>
                        <div className="separator"></div>
                        <div className="tutor-details">
                            <p><strong>Tutor:</strong> {tutorUsername}</p>
                            <p><strong>Email:</strong> {tutorEmail}</p>
                            <p><strong>Description:</strong> {tutorDescription}</p>
                        </div>
                    </>
                )}
            </div>
            {userProfile && userProfile.role === 'TUTOR' && (
                <>
                    <select value={newStatus} onChange={handleStatusChange}>
                        <option value="AVAILABLE">Available</option>
                        <option value="FULL">Full</option>
                    </select>
                    <button onClick={handleUpdateClick} className="update-button">Update Status</button>
                    <button onClick={handleDeleteClick} className="delete-button">Delete Course</button>
                </>
            )}
            {showBookButton && userProfile && userProfile.role === 'STUDENT' && (
                <button onClick={handleBookClick} className="book-button">Book</button>
            )}
        </div>
    );
};

export default ClassCard;
