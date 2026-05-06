import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Register({ apiRequest }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      alert('Please complete all fields.');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const payload = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      setMessage(payload.message || 'Registration successful. Please login.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirm('');
      setTimeout(() => {
        navigate('/login');
      }, 800);
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
          <h1 className="login-title">Create an account</h1>
          <h3 className="login-subtitle">Join Splitify — keep expenses balanced</h3>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name" className="login-label">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="login-input"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />

            <label htmlFor="email" className="login-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="login-input"
              placeholder="you@domain.com"
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <label htmlFor="confirm" className="login-label">Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              className="login-input"
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />

            {error ? <p className="text-red-600 text-sm">{error}</p> : null}
            {message ? <p className="text-green-600 text-sm">{message}</p> : null}

            <button type="submit" className="login-button" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="login-footer">
            Already have an account?
            <Link to="/login" className="register-link"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
