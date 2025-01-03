import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import './task_ad.css'; // Styling for tasks pages

const AdminTasks = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Add success state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteDialog(true);
  };

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axiosInstance.delete(`/tasks/delete/${taskToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Task deleted successfully!');
      setError('');
      setShowDeleteDialog(false);
      setTaskToDelete(null);
      fetchTasks(selectedTrack); // Refresh the tasks list
    } catch (err) {
      console.error('Delete task error:', err); // Log the error to the console
      if (err.msg) {
        setError(err.msg);
      } else if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError(err.message || 'Something went wrong');
      }
      setSuccess('');
      setShowDeleteDialog(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="tasks-page">
      <Navbar role="admin" />
      <div className="tasks-container">
        <h1 className="tasks-title">Tasks</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
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
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="task-actions">
                  <Link to={`/tasks/update/${task._id}`} className="task-action-button">Update</Link>
                  <button onClick={() => handleDeleteClick(task._id)} className="task-action-button">Delete</button>
                  <Link to={`/submissions/all/${task._id}`} className="task-action-button">View Submissions</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteDialog && (
          <div className="delete-dialog">
            <p>Are you sure you want to delete this task?</p>
            <button onClick={handleDeleteTask} className="dialog-button">YES</button>
            <button onClick={() => setShowDeleteDialog(false)} className="dialog-button">Cancel</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminTasks;