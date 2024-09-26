import { useParams } from 'react-router-dom'; // Correcting the import
import ClassBody from './ClassBody';
import React from 'react';
import Layout from './Layout';

const ClassPage = () => {
    
    return (
        <Layout showClassBody={false}>
        <div>
            <ClassBody />
        </div>
        </Layout>
    );
};

export default ClassPage;
