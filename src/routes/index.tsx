// My_web/my_blog/src/routes/index.tsx 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import About from '../pages/About';
import DynamicPage from '../pages/DynamicPage';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';
import BlogList from '../components/BlogList';
import BlogDetail from '../pages/BlogDetail';
import Register from '../pages/Register';
import AdminDashboard from '../admin/components/AdminDashboard';
import UserDashboard from '../user/components/UserDashboard';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dynamic/:id" element={<DynamicPage />} />
          <Route path="login" element={<Login />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="register" element={<Register />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route element={<PrivateRoute />}>
            <Route path="user/*" element={<UserDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
