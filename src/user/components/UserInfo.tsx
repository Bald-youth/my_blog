// my_blog/src/user/components/UserInfo.tsx

import React, { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log('获取到的用户ID:', userId); // 输出用户ID以供调试

      if (!userId || userId === 'undefined') {
        setError('未找到有效的用户ID，请重新登录。');
        console.error('用户ID未定义，请检查localStorage是否正确存储。');
        return;
      }

      const response = await axios.get<User>(`http://localhost:3001/api/users/${userId}`);
      setUser(response.data);
    } catch (err: any) {
      console.error('获取用户数据失败:', err);
      setError('获取用户数据失败，请检查网络或稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>正在加载用户信息...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>未找到用户信息</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={textStyle}>用户名: {user.username}</h2>
      <p style={textStyle}>邮箱: {user.email}</p>
    </div>
  );
};

const containerStyle: CSSProperties = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
};

const textStyle: CSSProperties = {
  fontSize: '16px',
  color: '#333',
  marginBottom: '10px',
};

export default UserInfo;
