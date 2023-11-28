// components/Header.tsx
import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <header>
      <h1>My Blog</h1>
      <Navbar />
    </header>
  );
};

export default Header;
