import React, { useState } from 'react';
import Navbar from '../../components/navbar'; // Importing the Navbar
import Footer from '../../components/footer'; // Importing the Footer
import Button from '../../components/button'; // Importing the Button component
import Modal from '../../components/Modal'; // Importing the Modal component
import './AdminViewSubmissions.css'; // Import the CSS for this component

const AdminViewSubmissions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const submissions = [
    { studentName: 'John Doe', submissionDate: '2024-12-28', feedback: 'Excellent work!' },
    { studentName: 'Jane Smith', submissionDate: '2024-12-29', feedback: 'Needs improvement.' },
    // Add more student submissions as needed
  ];

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="admin-container">
      <Navbar /> {/* Including the Navbar */}
      
      <div className="content">
        <h2 className="title">Student Submissions</h2>
        <table className="submission-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Submission Date</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.studentName}</td>
                <td>{submission.submissionDate}</td>
                <td>{submission.feedback}</td>
                <td>
                  <Button text="Provide Feedback" onClick={() => openModal(submission)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for providing feedback */}
      {modalOpen && selectedStudent && (
        <Modal isOpen={modalOpen} onClose={closeModal} title={`Provide Feedback for ${selectedStudent.studentName}`}>
          <textarea className="feedback-textarea" placeholder="Enter feedback..."></textarea>
          <Button text="Submit Feedback" className="submit-feedback" onClick={() => alert("Feedback submitted")} />
        </Modal>
      )}

      <Footer /> {/* Including the Footer */}
    </div>
  );
};

export default AdminViewSubmissions;
