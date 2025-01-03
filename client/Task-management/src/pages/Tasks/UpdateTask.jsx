import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './update_task.css'; // Styling for tasks pages
const UpdateTask = () => {
  const { taskId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [trackId, setTrackId] = useState('');
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        const response = await axiosInstance.get(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        const task = response.data.task;
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline.split('T')[0]); // Format the date for the input field
        setTrackId(task.track);
      } catch (err) {
        console.error('Fetch task error:', err); // Log the error to the console
        if (err.msg) {
          setError(err.msg);
        } else if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError(err.message || 'Something went wrong');
        }
      }
    };

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

    fetchTask();
    fetchTracks();
  }, [taskId]);

  const handleUpdateTask = async (e) => {
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
      const response = await axiosInstance.put(`/tasks/update/${taskId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Task updated successfully!');
      setError('');
    } catch (err) {
      console.error('Update task error:', err); // Log the error to the console
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
        <h1 className="tasks-title">Update Task</h1>
        <form className="tasks-form" onSubmit={handleUpdateTask}>
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
          <Button text="Update Task" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default UpdateTask;