import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import logo from '../../assets/logo.png';
import './InviteUser.css'; 

const AdminInviteUser = () => {
  const [email, setEmail] = useState('');
  const [trackId, setTrackId] = useState('');
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        const response = await axiosInstance.get('/tracks', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setTracks(response.data);
      } catch (err) {
        console.error('Fetch tracks error:', err); // Log the error to the console
        if (err.msg) {
          setError(err.msg);
        } else if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError(err.message || 'Something went wrong');
        }
      }
    };
    fetchTracks();
  }, []);

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
    <div className="invite-user-page">
      <Navbar role="admin" />
      <div className="invite-user-container">
        <div className="form-section">
          <h1 className="auth-title">Invite User</h1>
          <form className="auth-form" onSubmit={handleInvite}>
            <InputField label="Email" type="email" placeholder="Enter user's email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="input-field">
              <label htmlFor="track">Select Track</label>
              <select id="track" value={trackId} onChange={(e) => setTrackId(e.target.value)}>
                <option value="">Select a track</option>
                {tracks.map((track) => (
                  <option key={track._id} value={track._id}>
                    {track.name}
                  </option>
                ))}
              </select>
            </div>
            <Button text="Send Invite" type="submit" />
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
        <div className="logo-section">
          <img src={logo} alt="InterTechHub Logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInviteUser;