import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(process.env.REACT_APP_USER_URI + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Registration failed');
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
        <button type="submit">Register</button>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
      </form>
      <div style={{ marginTop: '1rem' }}>
        <span>Already have an account? </span>
        <button type="button" style={{ background: 'none', border: 'none', color: '#004f9e', cursor: 'pointer', textDecoration: 'underline', padding: 0 }} onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
