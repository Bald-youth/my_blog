import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { UserOutlined, BookFilled } from '@ant-design/icons';
import UserInfo from './UserInfo';
import UserBlog from './BlogInfo';

const { Sider, Content } = Layout;

const menuItems = [
  { key: 'info', title: '用户信息', icon: <UserOutlined /> },
  { key: 'blog', title: '我的博客', icon: <BookFilled /> }
];

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleMenuClick = (key: string) => {
    navigate(`/user/${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={80} theme="dark">
        <Menu mode="vertical" theme="dark" style={{ height: '100%', borderRight: 0 }}>
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Routes>
            <Route path="info" element={<UserInfo />} />
            <Route path="blog" element={<UserBlog />} />
            <Route path="/" element={<Navigate to="info" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
