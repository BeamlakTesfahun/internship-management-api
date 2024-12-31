import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './auth.css'; // Styling for auth pages

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/forgot-password', {
        email,
      });
      setSuccess(response.data.msg || 'Password reset link sent!');
      setError('');
    } catch (err) {
      console.error('Forgot password error:', err); // Log the error to the console
      if (err.msg) {
        setError(err.msg);
      } else if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError(err.message || 'Something went wrong');
      }
      setSuccess('');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h1 className="auth-title">Forgot Password</h1>
        <form className="auth-form" onSubmit={handleForgotPassword}>
          <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button text="Send Reset Link" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;