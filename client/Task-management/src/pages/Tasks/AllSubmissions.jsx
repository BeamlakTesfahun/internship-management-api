import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import './all_sub.css'; // Styling for tasks pages

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
      <Navbar role = 'admin' />
      <div className="tasks-container">
        <h1 className="tasks-title">All Submissions</h1>
        {error && <p className="error-message">{error}</p>}
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Content</th>
              <th>Links</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.student.email}</td>
                <td>{submission.submissionDetails.content}</td>
                <td>{submission.submissionDetails.links.join(', ')}</td>
                <td>
                  {submission.submissionDetails.file && (
                    <a href={submission.submissionDetails.file} target="_blank" rel="noopener noreferrer">Download</a>
                  )}
                </td>
                <td className="submission-actions">
                  <Link to={`/submissions/details/${submission._id}`} className="submission-action-button">View Details</Link>
                  <Link to={`/submissions/feedback/${submission._id}`} className="submission-action-button">Provide Feedback</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AllSubmissions;