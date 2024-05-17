// pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate(); // 使用 useNavigate 获取导航函数

  const handleLogin = async () => {
    // 假设这里有一个登录 API，你需要根据你的后端实现进行调整
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/user/dashboard')
        // 登录成功，执行相应的操作，比如重定向到受保护的页面
        // 可以使用路由库（如 react-router-dom）提供的 useHistory hook
        console.log('Login successful');
        // history.push('/dashboard'); // 假设有一个 Dashboard 页面
      } else {
        // 处理登录失败的情况，可能需要显示错误信息
        const data = await response.json();
        setError(data.message || '登录失败！！');
      }
    } catch (error) {
      console.error('登录时出现错误:', error);
      setError('发生了一个意料之外的错误！！');
    }
  };
    const handleRegisterRedirect = () => {
    // 点击注册按钮时跳转到注册页面
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
          {/* 添加注册按钮的点击事件 */}
          <br/>
          <button type="button" onClick={handleRegisterRedirect}>
            跳转注册
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  };
  
  export default Login;