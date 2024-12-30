import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Button from '../../components/button';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import './TaskManagementPage.css';

const TaskManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Assignment 1', deadline: '2024-12-31', status: 'Pending' },
    { id: 2, name: 'Project Report', deadline: '2024-12-25', status: 'Completed' },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="task-management-page">
      <Navbar role = 'admin'/>

      {/* Header Section */}
      <header className="page-header">
        <h1>Task Management</h1>
        <p>Manage and assign tasks effectively.</p>
      </header>

      {/* Filters and Actions */}
      <section className="filters-actions">
        <InputField 
          type="text" 
          placeholder="Search tasks..." 
          className="search-bar" 
        />
        <Button text="Create Task" className="create-task-button" onClick={openModal} />
      </section>

      {/* Task List */}
      <section className="task-list">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.deadline}</td>
                <td>{task.status}</td>
                <td>
                  <Button text="Edit" className="edit-button" />
                  <Button text="Delete" className="delete-button" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal for Creating Task */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Task">
        <form className="create-task-form">
          <InputField type="text" placeholder="Task Name" />
          <InputField type="date" />
          <InputField type="text" placeholder="Status (Pending/Completed)" />
          <Button text="Save Task" className="save-task-button" />
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default TaskManagementPage;
