import React, { useState } from 'react';
import Navbar from '../../components/navbar'; // Importing the Navbar
import Footer from '../../components/footer'; // Importing the Footer
import Button from '../../components/button'; // Importing the Button component
import Modal from '../../components/Modal'; // Importing the Modal component
import './StudentView.css'; // Import the CSS for this component

const StudentView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [deployedLink, setDeployedLink] = useState('');

  const tasks = [
    { taskName: 'Math Assignment 1', deadline: '2024-12-30', status: 'Pending', submissionDate: 'Not Submitted' },
    { taskName: 'English Essay', deadline: '2024-12-31', status: 'Submitted', submissionDate: '2024-12-29' },
    // Add more student tasks as needed
  ];

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    // Handle submission of URLs (for now, we can log the links to the console)
    console.log('GitHub Link:', githubLink);
    console.log('Deployed Site Link:', deployedLink);
    alert("Submission Received");
    setGithubLink('');
    setDeployedLink('');
    closeModal();
  };

  return (
    <div className="student-container">
      <Navbar /> {/* Including the Navbar */}
      
      <div className="content">
        <h2 className="title">Your Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Submission Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.deadline}</td>
                <td>{task.status}</td>
                <td>{task.submissionDate}</td>
                <td>
                  <Button text="Submit Task" onClick={() => openModal(task)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for submitting task links */}
      {modalOpen && selectedTask && (
        <Modal isOpen={modalOpen} onClose={closeModal} title={`Submit ${selectedTask.taskName}`}>
          <div className="input-group">
            <label htmlFor="github-link">GitHub Link</label>
            <input
              type="url"
              id="github-link"
              placeholder="Enter your GitHub link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="deployed-link">Deployed Site Link</label>
            <input
              type="url"
              id="deployed-link"
              placeholder="Enter your deployed site link"
              value={deployedLink}
              onChange={(e) => setDeployedLink(e.target.value)}
              className="input-field"
            />
          </div>
          <Button text="Submit" onClick={handleSubmit} className="submit-button" />
        </Modal>
      )}

      <Footer /> {/* Including the Footer */}
    </div>
  );
};

export default StudentView;
