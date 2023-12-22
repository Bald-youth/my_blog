// src/admin/components/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import { Button, Input, message, Space, Spin } from 'antd';

interface User {
  id: number;
  name: string;
  email: string;
  // 根据需要添加更多用户属性
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 模拟向后端 API 发送请求
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user?search=${searchKeyword}`); // 替换为实际的 API 端点
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('获取用户数据时发生错误:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [searchKeyword]);

  const handleDelete = () => {
    // 模拟向后端 API 发送删除请求
    try {
      // 替换为实际的 API 端点和方法（DELETE 请求）
      fetch(`/api/user/${user?.id}`, { method: 'DELETE' });
      message.success('用户删除成功');
      setUser(null); // 删除后清除用户数据
    } catch (error) {
      console.error('删除用户时发生错误:', error);
      message.error('删除用户时发生错误');
    }
  };

  const handleViewAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/allUsers'); // 替换为实际的 API 端点
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error('获取所有用户时发生错误:', error);
      message.error('获取所有用户时发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 搜索输入框和按钮 */}
      <Input
        placeholder="输入关键词..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      {/* 按钮 */}
      <Space>
        <Button type="primary" onClick={handleViewAllUsers}>
          查看所有用户
        </Button>
        <Button type="primary" onClick={() => setSearchKeyword('')}>
          搜索用户
                  </Button>
      </Space>

      {/* 显示用户信息 */}
      {loading ? (
        <Spin />
      ) : user ? (
        <div>
          <h2>用户资料</h2>
          <p>ID: {user.id}</p>
          <p>姓名: {user.name}</p>
          <p>邮箱: {user.email}</p>
          {/* 根据需要显示其他用户属性 */}

          {/* 删除按钮 */}
          <Button type="primary" onClick={handleDelete}>
            删除用户
          </Button>
        </div>
      ) : (
        <>
          <div>未找到用户</div>

          {/* 显示所有用户 */}
          {allUsers.length > 0 && (
            <div>
              <h2>所有用户</h2>
              <ul>
                {allUsers.map((user) => (
                  <li key={user.id}>
                    {user.name} - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;

