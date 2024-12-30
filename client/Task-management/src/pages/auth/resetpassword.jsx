import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import './auth.css';

const ResetPassword = () => {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h1 className="auth-title">Reset Password</h1>
        <form className="auth-form">
          <InputField label="New Password" type="password" placeholder="Enter your new password" />
          <InputField label="Confirm Password" type="password" placeholder="Confirm your new password" />
          <Button text="Reset Password" onClick={() => console.log('Reset Password clicked')} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
