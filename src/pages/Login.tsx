// pages/Login.tsx
import React, { useState } from 'react';
import '../styles/Login.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // 假设这里有一个登录 API，你需要根据你的后端实现进行调整
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 登录成功，执行相应的操作，比如重定向到受保护的页面
        // 可以使用路由库（如 react-router-dom）提供的 useHistory hook
        console.log('Login successful');
        // history.push('/dashboard'); // 假设有一个 Dashboard 页面
      } else {
        // 处理登录失败的情况，可能需要显示错误信息
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred');
    }
  };
    
    return (
      <div className="login-container">
        <h2>Login Page</h2>
        <form className="login-form">
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
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  };
  
  export default Login;