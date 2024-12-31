import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './auth.css'; // Styling for auth pages

const AdminInviteUser = () => {
  const [email, setEmail] = useState('');
  const [trackId, setTrackId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const payload = {
        email,
        trackId,
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axiosInstance.post('/auth/invite-user', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Invitation sent successfully!');
      setError('');
    } catch (err) {
      console.error('Invitation error:', err); // Log the error to the console
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
      <Navbar role="admin" />
      <div className="auth-container">
        <h1 className="auth-title">Invite User</h1>
        <form className="auth-form" onSubmit={handleInvite}>
          <InputField label="Email" type="email" placeholder="Enter user's email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Track ID" type="text" placeholder="Enter the track ID" value={trackId} onChange={(e) => setTrackId(e.target.value)} />
          <Button text="Send Invite" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default AdminInviteUser;