import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const ProvideFeedback = () => {
  const { submissionId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProvideFeedback = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const payload = {
        feedback,
        status,
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axiosInstance.post(`/submissions/feedback/${submissionId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Response:', response); // Log the response
      setSuccess(response.data.msg || 'Feedback submitted successfully!');
      setError('');
    } catch (err) {
      console.error('Provide feedback error:', err); // Log the error to the console
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
      <Navbar />
      <div className="tasks-container">
        <h1 className="tasks-title">Provide Feedback</h1>
        <form className="tasks-form" onSubmit={handleProvideFeedback}>
          <InputField label="Feedback" type="text" placeholder="Enter feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          <InputField label="Status" type="text" placeholder="Enter status" value={status} onChange={(e) => setStatus(e.target.value)} />
          <Button text="Submit Feedback" type="submit" />
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ProvideFeedback;