import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import './tasks.css'; // Styling for tasks pages

const AllSubmissions = () => {
  const { taskId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        const response = await axiosInstance.get(`/submissions/all/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setSubmissions(response.data.submissions);
      } catch (err) {
        console.error('Fetch all submissions error:', err); // Log the error to the console
        if (err.msg) {
          setError(err.msg);
        } else if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError(err.message || 'Something went wrong');
        }
      }
    };
    fetchAllSubmissions();
  }, [taskId]);

  return (
    <div className="tasks-page">
      <Navbar />
      <div className="tasks-container">
        <h1 className="tasks-title">All Submissions</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="submissions-list">
          {submissions.map((submission) => (
            <div key={submission._id} className="submission-item">
              <p><strong>Student:</strong> {submission.student.email}</p>
              <p><strong>Content:</strong> {submission.submissionDetails.content}</p>
              <p><strong>Links:</strong> {submission.submissionDetails.links.join(', ')}</p>
              {submission.submissionDetails.file && (
                <p><strong>File:</strong> <a href={submission.submissionDetails.file} target="_blank" rel="noopener noreferrer">Download</a></p>
              )}
              <div className="submission-actions">
                <Link to={`/submissions/details/${submission._id}`} className="submission-action-button">View Details</Link>
                <Link to={`/submissions/feedback/${submission._id}`} className="submission-action-button">Provide Feedback</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllSubmissions;