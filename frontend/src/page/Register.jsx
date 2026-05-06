import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      }, 1200);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9996B]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#5C4F4A]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="glass-panel w-full max-w-md p-10 rounded-3xl relative z-10 my-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#F3E4C9] mb-2 tracking-tight">Create an account</h1>
          <p className="text-[#F3E4C9]/70 font-medium text-sm">Join Splitify — keep expenses balanced seamlessly</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-[#F3E4C9] ml-1">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
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

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-[#F3E4C9] ml-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm" className="text-sm font-semibold text-[#F3E4C9] ml-1">Confirm Password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              className="w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border"
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error ? <p className="text-rose-500 text-sm font-bold mt-1 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">{error}</p> : null}
          {message ? <p className="text-emerald-500 text-sm font-bold mt-1 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">{message}</p> : null}

          <button 
            type="submit" 
            className="mt-4 w-full bg-[#C9996B] hover:brightness-105 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(201,153,107,0.3)] hover:shadow-[0_0_30px_rgba(201,153,107,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            disabled={submitting}
          >
            {submitting ? 'Setting up...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-[#F3E4C9]/70 text-sm font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C9996B] hover:text-[#C9996B]/80 font-bold transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
