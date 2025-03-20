import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    try {
      await login({ email, password });
      setMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/Dashboard');
      }, 2000);
    } catch (error) {
      setMessage('Login failed. Please try again.');
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;