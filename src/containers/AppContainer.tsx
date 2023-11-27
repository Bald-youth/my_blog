// containers/AppContainer.tsx
import React from 'react';
import Header from '../components/Header';
import Routes from '../routes';

const AppContainer: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes />
      </main>
    </div>
  );
};

export default AppContainer;
