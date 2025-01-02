import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const SubmissionDetails = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        const response = await axiosInstance.get(`/submissions/details/${submissionId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setSubmission(response.data.submission);
      } catch (err) {
        console.error('Fetch submission details error:', err); // Log the error to the console
        if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError(err.message || 'Something went wrong');
        }
      }
    };
    fetchSubmissionDetails();
  }, [submissionId]);

  return (
    <div className="tasks-page">
      <Navbar />
      <div className="tasks-container">
        <h1 className="tasks-title">Submission Details</h1>
        {error && <p className="error-message">{error}</p>}
        {submission ? (
          <div className="submission-details">
            <p><strong>Student:</strong> {submission.student.email}</p>
            <p><strong>Content:</strong> {submission.submissionDetails.content}</p>
            <p><strong>Links:</strong> {submission.submissionDetails.links.join(', ')}</p>
            {submission.submissionDetails.file && (
              <p><strong>File:</strong> <a href={submission.submissionDetails.file} target="_blank" rel="noopener noreferrer">Download</a></p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionDetails;