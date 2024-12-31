import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './auth.css'; // Styling for auth pages

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        password,
        confirmPassword,
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axiosInstance.post(`/auth/reset-password/${token}`, payload);
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Password reset successfully!');
      setError('');
    } catch (err) {
      console.error('Reset password error:', err); // Log the error to the console
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
        <h1 className="auth-title">Reset Password</h1>
        <form className="auth-form" onSubmit={handleResetPassword}>
          <InputField label="Password" type="password" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Confirm Password" type="password" placeholder="Confirm your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button text="Reset Password" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;