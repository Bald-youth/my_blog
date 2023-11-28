// containers/AppContainer.tsx
import React from 'react';
import Routes from '../routes';
import '../styles/AppContainer.css'
import BlogList from '../components/BlogList';

const AppContainer: React.FC = () => {
  return (
    <div className='container'>
      <Routes />
      <BlogList />
    </div>
  );
};

export default AppContainer;
