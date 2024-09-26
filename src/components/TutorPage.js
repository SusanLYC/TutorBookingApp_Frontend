import React from 'react';
import Header from './Header';
import MainBody from './CardBody';
import Layout from './Layout';
import { useParams } from 'react-router-dom'; // Correcting the import

const TutorPage = () => {
  const { searchTerm } = useParams(); // Get the search term from the URL parameters

  return (
    <Layout showClassBody={false}>
      <div>
        <Header name={searchTerm || '...'} description="Let's learn some professional hacking skills 🥷🏻" />
        <MainBody />
      </div>
    </Layout>
  );
};

export default TutorPage;
