// containers/AppContainer.tsx
import React from 'react';
import Routes from '../routes';
// import BlogList from '../components/BlogList';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

import '../styles/AppContainer.css'

const AppContainer: React.FC = () => {
  return (
    // <div className='container'>
    //   <Routes />
    //   <BlogList />
    // </div>
    <div className="container">
        <LeftSidebar />
        <main>
          <Routes />
        </main>
        <RightSidebar />
    </div>
   
  );
};

export default AppContainer;
