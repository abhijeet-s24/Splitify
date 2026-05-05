import React, { useState } from 'react';
import './Login.css';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !username || !email || !password || !confirm) {
      alert('Please complete all fields.');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    console.log('Registering', { fullName, username, email });
  };

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-container">
          <h1 className="login-title">Create an account</h1>
          <h3 className="login-subtitle">Join Splitify — keep expenses balanced</h3>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="fullname" className="login-label">Full name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              className="login-input"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />

            <label htmlFor="username" className="login-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="login-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
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

            <button type="submit" className="login-button">Create account</button>
          </form>

          <p className="login-footer">
            Already have an account?
            <a href="/login" className="register-link"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
