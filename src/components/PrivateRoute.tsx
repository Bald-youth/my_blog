// components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // 假设你有一个useAuth钩子来检查用户是否已登录

const PrivateRoute: React.FC = () => {
  // 假设这里有一个useAuth钩子，检查用户是否已登录
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;