import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './auth.css'; // 

const SetupAccount = () => {
  const { token } = useParams(); 
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSetup = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        password,
      };
      console.log('Request payload:', payload); 
      const response = await axiosInstance.post(`/auth/setup-account/${token}`, payload);
      console.log('Response:', response); 
      setSuccess(response.data.msg || 'Account setup successfully!');
      setError('');
    } catch (err) {
      console.error('Setup error:', err); 
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
      <Navbar  />
      <div className="auth-container">
        <h1 className="auth-title">Set Up Account</h1>
        <form className="auth-form" onSubmit={handleSetup}>
          <InputField label="Name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button text="Set Up Account" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default SetupAccount;