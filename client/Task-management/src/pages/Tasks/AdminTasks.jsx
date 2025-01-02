import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const AdminTasks = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

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

  const fetchTasks = async (trackId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axiosInstance.get(`/tasks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setTasks(response.data.tasks);
    } catch (err) {
      console.error('Fetch tasks error:', err); // Log the error to the console
      if (err.msg) {
        setError(err.msg);
      } else if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError(err.message || 'Something went wrong');
      }
    }
  };

  const handleTrackChange = (e) => {
    const trackId = e.target.value;
    setSelectedTrack(trackId);
    if (trackId) {
      fetchTasks(trackId);
    } else {
      setTasks([]);
    }
  };

  return (
    <div className="tasks-page">
      <Navbar role="admin" />
      <div className="tasks-container">
        <h1 className="tasks-title">Tasks</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-field">
          <label htmlFor="track">Select Track</label>
          <select id="track" value={selectedTrack} onChange={handleTrackChange}>
            <option value="">Select a track</option>
            {tracks.map((track) => (
              <option key={track._id} value={track._id}>
                {track.name}
              </option>
            ))}
          </select>
        </div>
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              <p><strong>Task ID:</strong> {task._id}</p>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <div className="task-actions">
                <Link to={`/tasks/update/${task._id}`} className="task-action-button">Update</Link>
                <Link to={`/tasks/delete/${task._id}`} className="task-action-button">Delete</Link>
                <Link to={`/submissions/all/${task._id}`} className="task-action-button">View Submissions</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminTasks;