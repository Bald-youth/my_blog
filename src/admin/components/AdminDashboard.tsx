import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import BlogManagement from '../components/BlogManagement';

const { Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={80} theme="dark">
        <Menu mode="vertical" theme="dark" style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="user" icon={<UserOutlined />} />
          <Menu.Item key="blog" icon={<FileTextOutlined />} />
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Routes>
            <Route path="user" element={<UserManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="*" element={<Navigate to="user" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
