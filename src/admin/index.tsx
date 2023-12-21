// src/admin/index.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../admin/components/AdminDashboard';
import UserManagement from '../admin/components/UserManagement';
import BlogManagement from '../admin/components/BlogManagement';


const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="blogs" element={<BlogManagement />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AdminRoutes;
