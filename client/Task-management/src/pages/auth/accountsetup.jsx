import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import './auth.css'; // Styling for auth pages

const SetPassword = () => {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h1 className="auth-title">Set Password</h1>
        <p className="auth-description">
          Create your account by setting up a secure password.
        </p>
        <form className="auth-form">
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your name"
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Create a new password"
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />
          <Button
            text="Set Password"
            onClick={() => console.log('Set Password clicked')}
          />
        </form>
        <div className="auth-links">
          <a href="/login" className="auth-link">
            Already have an account? Login
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SetPassword;
