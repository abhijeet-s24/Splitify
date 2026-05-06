
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login({ apiRequest, onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      onAuthSuccess(response.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-container">
          <h1 className="login-title">Welcome Back</h1>
          <h3 className="login-subtitle">Sign in to your account</h3>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email" className="login-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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

            {error ? <p className="text-red-600 text-sm">{error}</p> : null}

            <button type="submit" className="login-button" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="login-footer">
            New user? <Link to="/register" className="register-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
