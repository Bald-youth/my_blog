// pages/DynamicPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const DynamicPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Dynamic Page</h2>
      <p>Dynamic content for ID: {id}</p>
      <Footer />
    </div>

  );
};

export default DynamicPage;
