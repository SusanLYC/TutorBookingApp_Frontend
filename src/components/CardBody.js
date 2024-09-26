import ClassCard from './ClassCard';
import React from 'react';

const MainBody = () => {

  const classes = [
    {
        name: 'Linus 101',
        description: 'Basic Linus covering file management and command line.',
        dateStart: '2024-09-01',
        dateEnd: '2024-12-15',
        status: 'Upcoming'
    },
    {
        name: 'Linus 202',
        description: 'Introduction to network and key extraction.',
        dateStart: '2024-09-01',
        dateEnd: '2024-12-15',
        status: 'Ongoing'
    },
    {
        name: 'Hacking 101',
        description: 'Learn some real useful stuff.',
        dateStart: '2024-09-01',
        dateEnd: '2024-12-15',
        status: 'Completed'
    }
  ];


    return (
      <div className="App">
         {classes.map((classItem, index) => (
                <ClassCard
                    key={index}
                    name={classItem.name}
                    description={classItem.description}
                    dateStart={classItem.dateStart}
                    dateEnd={classItem.dateEnd}
                    status={classItem.status}
                />
            ))}
      </div>
    )
}
export default MainBody;