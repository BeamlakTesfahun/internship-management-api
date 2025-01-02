import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const SubmitTask = () => {
  const { taskId } = useParams();
  const [content, setContent] = useState('');
  const [links, setLinks] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const formData = new FormData();
      formData.append('content', content);
      formData.append('links', links);
      if (file) {
        formData.append('file', file);
      }
      console.log('Request payload:', formData); // Log the request payload
      const response = await axiosInstance.post(`/submissions/submit-task/${taskId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Task submitted successfully!');
      setError('');
    } catch (err) {
      console.error('Submit task error:', err); // Log the error to the console
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
      <Navbar role="student" />
      <div className="tasks-container">
        <h1 className="tasks-title">Submit Task</h1>
        <form className="tasks-form" onSubmit={handleSubmitTask}>
          <InputField label="Content" type="text" placeholder="Enter task content" value={content} onChange={(e) => setContent(e.target.value)} />
          <InputField label="Links" type="text" placeholder="Enter task links" value={links} onChange={(e) => setLinks(e.target.value)} />
          <div className="input-field">
            <label htmlFor="file">File</label>
            <input id="file" type="file" onChange={handleFileChange} />
          </div>
          <Button text="Submit Task" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default SubmitTask;