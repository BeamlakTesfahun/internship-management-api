import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './auth.css'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      setSuccess('Login successful!');
      setError('');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className="auth-page">
      <Navbar role="admin" />
      <div className="auth-container">
        <div className="form-section">
          <h1 className="auth-title">Login</h1>
          <form className="auth-form" onSubmit={handleLogin}>
            <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button text="Login" type="submit" />
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="auth-links">
            <a href="/register-admin" className="auth-link">Don't have an account? Sign Up</a>
          </div>
        </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;