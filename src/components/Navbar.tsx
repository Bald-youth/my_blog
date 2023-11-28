// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // 新增的样式文件

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dynamic/1">Dynamic Page 1</Link></li>
        <li><Link to="/dynamic/2">Dynamic Page 2</Link></li>
        {/* 添加其他页面链接 */}
      </ul>
    </nav>
  );
};

export default Navbar;
