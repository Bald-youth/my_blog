// containers/AppContainer.tsx
import React from 'react';
import Routes from '../routes';
import '../styles/AppContainer.css'
const AppContainer: React.FC = () => {
  return (
    <div className='container'>
      <Routes />
    </div>
  );
};

export default AppContainer;
