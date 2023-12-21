// containers/AppContainer.tsx
import React from 'react';
import Routes from '../routes';
// import BlogList from '../components/BlogList';
// import LeftSidebar from '../components/LeftSidebar';
// import RightSidebar from '../components/RightSidebar';
import SearchBox from '../components/SearchBox';

import '../styles/AppContainer.css'

const mockData = [
  { key: '1', value: 'Blog Post 1' },
  { key: '2', value: 'Blog Post 2' },
  // Add more data as needed 模拟数据，后期修改为真实接口返回的数据
];

const AppContainer: React.FC = () => {
  const handleSearchSelect = (record: { key: string; value: string }) => {
    // Do something when a search result is selected
    console.log('Selected:', record);
  };

  return (
    <div className="container">
      {/* <LeftSidebar /> */}
      <main>
        <SearchBox data={mockData} onSelect={handleSearchSelect} />
        <Routes />
      </main>
      {/* <RightSidebar /> */}
    </div>
  );
};


export default AppContainer;
