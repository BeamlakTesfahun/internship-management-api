import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './tracks.css'; // Styling for tracks pages

const CreateTrack = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateTrack = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const payload = {
        name,
        description,
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axiosInstance.post('/tracks/create', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Track created successfully!');
      setError('');
    } catch (err) {
      console.error('Create track error:', err); // Log the error to the console
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
    <div className="tracks-page">
      <Navbar role = 'admin' />
      <div className="tracks-container">
        <h1 className="tracks-title">Create Track</h1>
        <form className="tracks-form" onSubmit={handleCreateTrack}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter track name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter track description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>
          <Button text="Create Track" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateTrack;