// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import About from '../pages/About';
import DynamicPage from '../pages/DynamicPage';
import Login from '../pages/Login'; // 导入登录页面组件
import BlogList from '../components/BlogList';
import BlogDetail from '../pages/BlogDetail';
import Register from '../pages/Register';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dynamic/:id" element={<DynamicPage />} />
          <Route path="/login" element={<Login />} /> {/* 添加登录页面路由 */}
          <Route path='/blog' element={<BlogList />} />
           <Route path="/register" element={<Register />} />
          <Route path='/blog/:id' element={<BlogDetail />} />
          {/* 添加其他页面路由 */}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
