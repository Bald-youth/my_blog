// pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // 使用 useNavigate 获取导航函数

  const handleRegister = async () => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        // 注册成功，可以执行相应的操作，比如重定向到登录页面
        console.log('注册成功！！');
        navigate('/login'); // 假设有一个登录页面
      } else {
        // 处理注册失败的情况，可能需要显示错误信息
        const data = await response.json();
        setError(data.message || '注册失败！！');
      }
    } catch (error) {
      console.error('注册时错误:', error);
      setError('前端->发生了一个意外的错误！！');
    }
  };

  const handleLoginRedirect = () => {
    // 点击注册按钮时跳转到注册页面
    navigate('/login'); // 使用 navigate 进行页面跳转
  };

  return (
    <div className="register-container">
      <h2>Register Page</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        {/* 添加注册按钮的点击事件 */}
          <button type="button" onClick={handleLoginRedirect}>
             Login Page
             
          </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
