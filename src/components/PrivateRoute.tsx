import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  // 检查 localStorage 中是否存在 authToken
  const token = localStorage.getItem('authToken');
  return !!token;
};

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
