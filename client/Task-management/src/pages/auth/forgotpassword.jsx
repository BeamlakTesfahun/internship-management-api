import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import './auth.css';

const ForgotPassword = () => {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-description">
          Enter your registered email address, and we’ll send you instructions to reset your password.
        </p>
        <form className="auth-form">
          <InputField label="Email" type="email" placeholder="Enter your email" />
          <Button text="Send Instructions" onClick={() => console.log('Forgot Password clicked')} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
