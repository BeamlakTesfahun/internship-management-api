import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const StudentTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axiosInstance.get(`/tasks/student/${user.userId}`, {
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
    fetchTasks();
  }, []);

  return (
    <div className="tasks-page">
      <Navbar role="student" />
      <div className="tasks-container">
        <h1 className="tasks-title">My Tasks</h1>
        {error && <p className="error-message">{error}</p>}
        {tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks found for this student's track.</p>
        ) : (
          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task._id} className="task-item">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <div className="task-actions">
                  <Link to={`/submissions/submit-task/${task._id}`} className="task-action-button">Submit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StudentTasks;