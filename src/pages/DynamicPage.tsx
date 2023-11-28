// pages/DynamicPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const DynamicPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Dynamic Page</h2>
      <p>Dynamic content for ID: {id}</p>
    </div>
  );
};

export default DynamicPage;
