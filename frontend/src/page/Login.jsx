
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9996B]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5C4F4A]/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      <div className="glass-panel w-full max-w-md p-10 rounded-3xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#F3E4C9] mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-[#F3E4C9]/70 font-medium">Sign in to continue to Splitify</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#F3E4C9] ml-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-[#F3E4C9] ml-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error ? <p className="text-rose-400 text-sm font-medium mt-1">{error}</p> : null}

          <button 
            type="submit" 
            className="mt-2 w-full bg-[#C9996B] hover:brightness-105 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(201,153,107,0.3)] hover:shadow-[0_0_30px_rgba(201,153,107,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-[#F3E4C9]/70 text-sm font-medium">
          New to Splitify?{' '}
          <Link to="/register" className="text-[#C9996B] hover:text-[#C9996B]/80 font-bold transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
