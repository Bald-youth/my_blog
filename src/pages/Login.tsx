import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // 使用 useNavigate 获取导航函数

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('authToken', data.token); // 存储token
          navigate('/user/dashboard'); // 登录成功后跳转
          console.log('Login successful');
        } else {
          setError('未能获取到身份验证令牌！');
        }
      } else {
        setError(data.message || '登录失败！！');
      }
    } catch (error) {
      console.error('登录时出现错误:', error);
      setError('发生了一个意料之外的错误！！');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // 使用 navigate 进行页面跳转
  };

  return (
    <div className="login-container">
      <h2>登录页面</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">用户名称:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">用户密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          点击登录
        </button>
        <br />
        <button type="button" onClick={handleRegisterRedirect}>
          跳转注册
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;

