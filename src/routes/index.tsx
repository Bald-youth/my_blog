// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import About from '../pages/About';
import DynamicPage from '../pages/DynamicPage'; // 导入动态页面组件

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dynamic/:id" element={<DynamicPage />} /> {/* 动态页面路由 */}
          {/* 添加其他页面路由 */}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
