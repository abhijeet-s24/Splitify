// ...existing code...
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    console.log('Logging in with', { username, password });
  };

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-container">
          <h1 className="login-title">Welcome Back</h1>
          <h3 className="login-subtitle">Sign in to your account</h3>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="username" className="login-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button type="submit" className="login-button">Login</button>
          </form>

          <p className="login-footer">
            New user? <a href="/register" className="register-link">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
// ...existing code...