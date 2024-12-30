import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import './auth.css'; // Styling for auth pages

const Login = () => {
  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form">
          <InputField label="Email" type="email" placeholder="Enter your email" />
          <InputField label="Password" type="password" placeholder="Enter your password" />
          <Button text="Login" onClick={() => console.log('Login clicked')} />
        </form>
        <div className="auth-links">
          <a href="/forgot-password" className="auth-link">Forgot Password?</a>
          {/* <a href="/signup" className="auth-link">Don't have an account? Sign Up</a> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
