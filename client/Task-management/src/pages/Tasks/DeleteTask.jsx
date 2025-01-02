import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const DeleteTask = () => {
  const { taskId } = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axiosInstance.delete(`/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Task deleted successfully!');
      setError('');
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
    }
  };

  return (
    <div className="tasks-page">
      <Navbar role="admin" />
      <div className="tasks-container">
        <h1 className="tasks-title">Delete Task</h1>
        <Button text="Delete Task" onClick={handleDeleteTask} />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default DeleteTask;