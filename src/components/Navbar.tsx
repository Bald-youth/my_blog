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
        <li><Link to="/dynamic/1">Dynamic Page</Link></li>
        {/* <li><Link to="/dynamic/2">Dynamic Page 2</Link></li> */}
        <li><Link to="/login">Login</Link></li>
        <li><Link to="admin">Admin Page</Link></li> 
        {/* admin开发完成后，需要添加到login页面中去，不然安全性问题很大 */}


        {/* 添加其他页面链接 */}
      </ul>
    </nav>
  );
};

export default Navbar;
