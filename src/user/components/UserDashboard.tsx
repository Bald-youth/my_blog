// src/user/components/UserDashboard.tsx
import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { UserOutlined, BookFilled } from '@ant-design/icons';
import UserInfo from './UserInfo';

const { Sider, Content } = Layout;

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 检查是否有有效的身份验证令牌
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'info':
        navigate('/user/info');
        break;
      case 'blog':
        navigate('/user/blog');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={80} theme="dark">
        <Menu mode="vertical" theme="dark" style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="info" icon={<UserOutlined />} onClick={() => handleMenuClick('info')}>
            用户信息
          </Menu.Item>
          <Menu.Item key="blog" icon={<BookFilled />} onClick={() => handleMenuClick('blog')}>
            我的博客
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Routes>
            <Route path="info" element={<UserInfo />} />
            <Route path="blog/*" element={<UserInfo />} />
            <Route path="/" element={<Navigate to="info" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
