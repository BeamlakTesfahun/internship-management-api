import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
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

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const payload = {
        title,
        description,
        deadline,
        trackId,
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axiosInstance.post('/tasks/create', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Task created successfully!');
      setError('');
    } catch (err) {
      console.error('Create task error:', err); // Log the error to the console
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
    <div className="tasks-page">
      <Navbar role="admin" />
      <div className="tasks-container">
        <h1 className="tasks-title">Create Task</h1>
        <form className="tasks-form" onSubmit={handleCreateTask}>
          <InputField label="Title" type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <InputField label="Description" type="text" placeholder="Enter task description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <InputField label="Deadline" type="date" placeholder="Enter task deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <div className="input-field">
            <label htmlFor="track">Track</label>
            <select id="track" value={trackId} onChange={(e) => setTrackId(e.target.value)}>
              <option value="">Select a track</option>
              {tracks.map((track) => (
                <option key={track._id} value={track._id}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>
          <Button text="Create Task" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateTask;